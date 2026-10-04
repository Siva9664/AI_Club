/* eslint-disable @typescript-eslint/no-explicit-any */
import { prisma } from '../prisma';
import { AppError } from '../errors';
import { buildMeta, parsePagination } from '../pagination';
import { serializeResource, serializeResourceList } from '../serialize';
import { recordActivity } from '../activity';
import { slugify } from '../slug';
import type { ActorContext, ResourceConfig } from './types';

const INCLUDE_RELATIONS = { updatedBy: { select: { name: true } } } as const;

const toUpper = (status?: string) => (status ? status.toUpperCase() : undefined);

function buildSearch(q: string | undefined, fields: string[]) {
  if (!q) return undefined;
  return fields.map((field) => ({ [field]: { contains: q, mode: 'insensitive' } }));
}

function buildYearFilter(field: 'year' | 'visitDate' | undefined, year: number | undefined) {
  if (!field || year === undefined) return undefined;
  if (field === 'year') return { year };
  return {
    visitDate: {
      gte: new Date(Date.UTC(year, 0, 1)),
      lt: new Date(Date.UTC(year + 1, 0, 1)),
    },
  };
}

/** Generic CRUD service shared by projects, achievements, guests and members. */
export class ResourceService {
  constructor(private readonly config: ResourceConfig) {}

  private get delegate() {
    return this.config.delegate();
  }

  /* ----------------------------- public ------------------------------- */

  private buildPublicWhere(query: Record<string, any>) {
    const where: any = { deletedAt: null, status: 'APPROVED' };

    if (this.config.exactFilters?.length) {
      this.config.exactFilters.forEach((field) => {
        const value = query[field];
        if (value !== undefined && value !== '') where[field] = value;
      });
    }
    if (this.config.featuredFilter && query.featured !== undefined) {
      where.featured = query.featured;
    }
    if (this.config.tagField && query.tag) {
      where[this.config.tagField] = { has: query.tag };
    }
    const yearFilter = buildYearFilter(this.config.yearField, query.year);
    if (yearFilter) Object.assign(where, yearFilter);

    const search = buildSearch(query.q, this.config.searchable);
    if (search) where.OR = search;

    return where;
  }

  private buildOrder(query: Record<string, any>, isAdmin: boolean) {
    if (query.sort) {
      const raw = String(query.sort);
      const desc = raw.startsWith('-');
      const field = desc ? raw.slice(1) : raw;
      const allowed = isAdmin
        ? [this.config.titleField, 'priority', 'createdAt', 'updatedAt', 'year', 'status']
        : ['priority', 'createdAt', 'name', 'year', ...(this.config.publicSortFields ?? [])];
      if (!allowed.includes(field)) {
        throw AppError.badRequest(`Cannot sort by "${field}"`);
      }
      return [{ [field]: desc ? 'desc' : 'asc' }];
    }
    if (isAdmin && this.config.defaultAdminSort) {
      const raw = this.config.defaultAdminSort;
      const desc = raw.startsWith('-');
      const field = desc ? raw.slice(1) : raw;
      return [{ [field]: desc ? 'desc' : 'asc' }];
    }
    return [{ priority: 'asc' }, { createdAt: 'desc' }];
  }

  async publicList(query: Record<string, any>) {
    const { page, limit, skip } = parsePagination(query);
    const where = this.buildPublicWhere(query);
    const orderBy = this.buildOrder(query, false);
    const [total, rows] = await Promise.all([
      this.delegate.count({ where }),
      this.delegate.findMany({ where, orderBy, skip, take: limit, include: INCLUDE_RELATIONS }),
    ]);
    return { items: serializeResourceList(rows), meta: buildMeta(page, limit, total) };
  }

  async publicGet(key: string) {
    const where: any = { deletedAt: null, status: 'APPROVED' };
    if (this.config.slugField) where[this.config.slugField] = key;
    else where.id = Number.isNaN(Number(key)) ? -1 : Number(key);

    const row = await this.delegate.findFirst({ where, include: INCLUDE_RELATIONS });
    if (!row) throw AppError.notFound(`${this.config.resourceType} not found`);
    return serializeResource(row);
  }

  /* ------------------------------ admin -------------------------------- */

  private buildAdminWhere(query: Record<string, any>) {
    const where: any = {};
    if (query.status) where.status = toUpper(query.status);
    where.deletedAt = query.deleted === 'true' ? { not: null } : null;

    if (this.config.exactFilters?.length) {
      this.config.exactFilters.forEach((field) => {
        const value = query[field];
        if (value !== undefined && value !== '') where[field] = value;
      });
    }
    if (this.config.featuredFilter && query.featured !== undefined) {
      where.featured = query.featured;
    }
    const search = buildSearch(query.q, this.config.searchable);
    if (search) where.OR = search;
    return where;
  }

  async adminList(query: Record<string, any>) {
    const { page, limit, skip } = parsePagination(query);
    const where = this.buildAdminWhere(query);
    const orderBy = this.buildOrder(query, true);
    const [total, rows] = await Promise.all([
      this.delegate.count({ where }),
      this.delegate.findMany({ where, orderBy, skip, take: limit, include: INCLUDE_RELATIONS }),
    ]);
    return { items: serializeResourceList(rows), meta: buildMeta(page, limit, total) };
  }

  async adminGetById(id: number) {
    const row = await this.delegate.findFirst({ where: { id }, include: INCLUDE_RELATIONS });
    if (!row) throw AppError.notFound(`${this.config.resourceType} not found`);
    return serializeResource(row);
  }

  private async uniqueSlug(base: string, ignoreId?: number) {
    const field = this.config.slugField as string;
    const seed = slugify(base) || this.config.resourceType;
    let candidate = seed;
    let counter = 2;
    for (let i = 0; i < 1000; i += 1) {
      const found = await this.delegate.findFirst({
        where: { [field]: candidate, ...(ignoreId ? { NOT: { id: ignoreId } } : {}) },
        select: { id: true },
      });
      if (!found) return candidate;
      candidate = `${seed}-${counter}`;
      counter += 1;
    }
    return `${seed}-${Date.now()}`;
  }

  private async withSlug(data: Record<string, any>, ignoreId?: number) {
    if (!this.config.slugField) return data;
    const field = this.config.slugField;
    const source = this.config.slugSource ?? this.config.titleField;
    const preferred = (data[field] as string) || (data[source] as string) || '';
    return { ...data, [field]: await this.uniqueSlug(preferred, ignoreId) };
  }

  async create(data: Record<string, any>, actor: ActorContext) {
    const payload = await this.withSlug({ ...data, updatedById: actor.userId });
    const row = await this.delegate.create({ data: payload, include: INCLUDE_RELATIONS });
    await recordActivity(prisma, {
      action: 'created',
      resourceType: this.config.resourceType,
      resourceId: row.id,
      title: row[this.config.titleField],
      userId: actor.userId,
    });
    return serializeResource(row);
  }

  async update(id: number, data: Record<string, any>, actor: ActorContext) {
    const existing = await this.delegate.findFirst({ where: { id }, select: { id: true } });
    if (!existing) throw AppError.notFound(`${this.config.resourceType} not found`);
    const payload = await this.withSlug({ ...data, updatedById: actor.userId }, id);
    const row = await this.delegate.update({ where: { id }, data: payload, include: INCLUDE_RELATIONS });
    await recordActivity(prisma, {
      action: 'updated',
      resourceType: this.config.resourceType,
      resourceId: id,
      title: row[this.config.titleField],
      userId: actor.userId,
    });
    return serializeResource(row);
  }
  async softDelete(id: number, actor: ActorContext) {
    const row = await this.delegate.update({
      where: { id },
      data: { deletedAt: new Date(), updatedById: actor.userId },
      include: INCLUDE_RELATIONS,
    });
    await recordActivity(prisma, {
      action: 'deleted',
      resourceType: this.config.resourceType,
      resourceId: id,
      title: row[this.config.titleField],
      userId: actor.userId,
    });
    return serializeResource(row);
  }

  async restore(id: number, actor: ActorContext) {
    const row = await this.delegate.update({
      where: { id },
      data: { deletedAt: null, updatedById: actor.userId },
      include: INCLUDE_RELATIONS,
    });
    await recordActivity(prisma, {
      action: 'restored',
      resourceType: this.config.resourceType,
      resourceId: id,
      title: row[this.config.titleField],
      userId: actor.userId,
    });
    return serializeResource(row);
  }

  async setStatus(id: number, status: string, reason: string | undefined, actor: ActorContext) {
    const upper = toUpper(status) as string;
    if (upper === 'REJECTED' && (!reason || !reason.trim())) {
      throw AppError.validation('A reason is required when rejecting', { reason: 'Reason is required' });
    }
    const row = await this.delegate.update({
      where: { id },
      data: {
        status: upper,
        rejectionReason: upper === 'REJECTED' ? reason : null,
        updatedById: actor.userId,
      },
      include: INCLUDE_RELATIONS,
    });
    await recordActivity(prisma, {
      action: status.toLowerCase(),
      resourceType: this.config.resourceType,
      resourceId: id,
      title: row[this.config.titleField],
      userId: actor.userId,
    });
    return serializeResource(row);
  }

  async setFeatured(id: number, featured: boolean, actor: ActorContext) {
    const row = await this.delegate.update({
      where: { id },
      data: { featured, updatedById: actor.userId },
      include: INCLUDE_RELATIONS,
    });
    await recordActivity(prisma, {
      action: featured ? 'featured' : 'unfeatured',
      resourceType: this.config.resourceType,
      resourceId: id,
      title: row[this.config.titleField],
      userId: actor.userId,
    });
    return serializeResource(row);
  }

  async reorder(orderedIds: number[], actor: ActorContext) {
    const delegate = this.delegate;
    await prisma.$transaction(
      orderedIds.map((id, index) =>
        delegate.update({ where: { id }, data: { priority: index + 1 } })
      )
    );
    await recordActivity(prisma, {
      action: 'reordered',
      resourceType: this.config.resourceType,
      resourceId: null,
      title: `${orderedIds.length} items`,
      userId: actor.userId,
    });
    return { reordered: orderedIds.length };
  }

  async bulk(
    ids: number[],
    action: string,
    reason: string | undefined,
    actor: ActorContext
  ): Promise<{ affected: number }> {
    if (action === 'reject' && (!reason || !reason.trim())) {
      throw AppError.validation('A reason is required when rejecting', { reason: 'Reason is required' });
    }
    let affected = 0;
    for (const id of ids) {
      try {
        if (action === 'approve') await this.setStatus(id, 'APPROVED', undefined, actor);
        else if (action === 'reject') await this.setStatus(id, 'REJECTED', reason, actor);
        else if (action === 'feature') await this.setFeatured(id, true, actor);
        else if (action === 'unfeature') await this.setFeatured(id, false, actor);
        else if (action === 'delete') await this.softDelete(id, actor);
        else if (action === 'restore') await this.restore(id, actor);
        else throw AppError.badRequest(`Unsupported bulk action: ${action}`);
        affected += 1;
      } catch (error) {
        if (error instanceof AppError && error.code === 'NOT_FOUND') continue;
        throw error;
      }
    }
    return { affected };
  }
}

/** Creates a bound service instance for a resource config. */
export function createResourceService(config: ResourceConfig) {
  return new ResourceService(config);
}


