import { prisma } from '../../lib/prisma';
import { buildMeta, parsePagination } from '../../lib/pagination';

/** Filterable, paginated activity feed with the acting user's name. */
export async function listActivity(query: Record<string, unknown>) {
  const { page, limit, skip } = parsePagination(query);
  const where: Record<string, unknown> = {};
  if (typeof query.resourceType === 'string' && query.resourceType) {
    where.resourceType = query.resourceType;
  }
  if (typeof query.action === 'string' && query.action) where.action = query.action;
  if (typeof query.userId === 'number') where.userId = query.userId;
  if (typeof query.q === 'string' && query.q) {
    where.title = { contains: query.q, mode: 'insensitive' };
  }

  const [total, rows] = await Promise.all([
    prisma.activityLog.count({ where }),
    prisma.activityLog.findMany({
      where,
      orderBy: { createdAt: 'desc' },
      skip,
      take: limit,
      include: { user: { select: { name: true, email: true } } },
    }),
  ]);

  const items = rows.map((row) => ({
    id: row.id,
    action: row.action,
    resourceType: row.resourceType,
    resourceId: row.resourceId,
    title: row.title,
    by: row.user?.name ?? 'system',
    at: row.createdAt,
  }));

  return { items, meta: buildMeta(page, limit, total) };
}