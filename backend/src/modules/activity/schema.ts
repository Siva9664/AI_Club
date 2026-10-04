import { z } from 'zod';

export const activityQuerySchema = z.object({
  page: z.coerce.number().int().positive().optional(),
  limit: z.coerce.number().int().positive().max(100).optional(),
  resourceType: z.string().trim().optional(),
  action: z.string().trim().optional(),
  userId: z.coerce.number().int().positive().optional(),
  q: z.string().trim().optional(),
});