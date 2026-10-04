import { z } from 'zod';

export const STATUS_VALUES = ['draft', 'pending', 'approved', 'rejected'] as const;

/** Coerces "true"/"false" query strings (and real booleans) into a boolean. */
export const zBoolean = z.preprocess(
  (value) => {
    if (value === 'true' || value === true) return true;
    if (value === 'false' || value === false) return false;
    return value;
  },
  z.boolean()
);

/** Status accepts any case and normalises to lower case. */
export const zStatus = z
  .string()
  .transform((value) => value.toLowerCase())
  .refine((value) => (STATUS_VALUES as readonly string[]).includes(value), {
    message: `Status must be one of: ${STATUS_VALUES.join(', ')}`,
  });

/** Shared query fields for public list endpoints. */
export const publicListBase = {
  page: z.coerce.number().int().positive().optional(),
  limit: z.coerce.number().int().positive().max(100).optional(),
  sort: z.string().optional(),
  q: z.string().trim().optional(),
  featured: zBoolean.optional(),
  year: z.coerce.number().int().optional(),
};

/** Shared query fields for admin list endpoints. */
export const adminListBase = {
  ...publicListBase,
  status: zStatus.optional(),
  deleted: z.enum(['true', 'false']).optional(),
};

export const statusBodySchema = z.object({
  status: zStatus,
  reason: z.string().trim().max(500).optional(),
});

export const featuredBodySchema = z.object({
  featured: z.boolean(),
});

export const reorderBodySchema = z.object({
  orderedIds: z.array(z.coerce.number().int().positive()).min(1, 'Provide at least one id'),
});

export const bulkBodySchema = z.object({
  ids: z.array(z.coerce.number().int().positive()).min(1, 'Provide at least one id'),
  action: z.enum(['approve', 'reject', 'feature', 'unfeature', 'delete', 'restore']),
  reason: z.string().trim().max(500).optional(),
});

export const idParamSchema = z.object({
  id: z.coerce.number().int().positive(),
});

/** Converts a slug/title into a value the create schema accepts. */
export const optionalSlug = z.string().trim().min(1).max(120).optional();

export type StatusValue = (typeof STATUS_VALUES)[number];
