import type { ZodTypeAny } from 'zod';

/* eslint-disable @typescript-eslint/no-explicit-any */

/** A Prisma model delegate (e.g. prisma.project) accessed lazily. */
export type Delegate = {
  findMany: (args?: any) => Promise<any[]>;
  count: (args?: any) => Promise<number>;
  findFirst: (args?: any) => Promise<any | null>;
  findUnique: (args?: any) => Promise<any | null>;
  create: (args: any) => Promise<any>;
  update: (args: any) => Promise<any>;
  updateMany: (args: any) => Promise<{ count: number }>;
};

/**
 * Configuration describing one managed resource. Drives the generic
 * public/admin CRUD engine so the four content resources share one code path.
 */
export interface ResourceConfig {
  /** API resource key, e.g. "projects" (used in activity logs & errors). */
  resourceType: string;
  /** Returns the Prisma delegate for the underlying table. */
  delegate: () => Delegate;
  /** Field used as the public URL slug (projects only). */
  slugField?: string;
  /** Field the slug is derived from when none is supplied (projects). */
  slugSource?: string;
  /** Human title used in activity-log rows. */
  titleField: string;
  /** Fields matched by the free-text `q` filter. */
  searchable: string[];
  /** Fields matched exactly by query params of the same name. */
  exactFilters: string[];
  /** Supports the boolean `featured` filter. */
  featuredFilter?: boolean;
  /** Supports a `tag` filter against a string array column. */
  tagField?: string;
  /** Supports a `year` filter; `year` is a number column, `visitDate` a Date. */
  yearField?: 'year' | 'visitDate';
  /** Default sort field for admin lists (prefix '-' for descending). */
  defaultAdminSort?: string;
  /** Public sort fields allowed via ?sort= (in addition to priority/createdAt). */
  publicSortFields?: string[];

  createSchema: ZodTypeAny;
  updateSchema: ZodTypeAny;
  publicListQuerySchema: ZodTypeAny;
  adminListQuerySchema: ZodTypeAny;
  statusSchema: ZodTypeAny;
  featuredSchema: ZodTypeAny;
  reorderSchema: ZodTypeAny;
  bulkSchema: ZodTypeAny;
}

export interface ActorContext {
  userId: number | null;
}
