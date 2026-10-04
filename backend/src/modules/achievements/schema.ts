import { z } from 'zod';
import {
  adminListBase,
  bulkBodySchema,
  featuredBodySchema,
  publicListBase,
  reorderBodySchema,
  statusBodySchema,
  zStatus,
} from '../../lib/resource/schemas';

const achievementFields = {
  name: z.string().trim().min(2).max(200),
  year: z.coerce.number().int().min(1990).max(2100),
  description: z.string().trim().max(5000).optional(),
  category: z.string().trim().max(100).optional(),
  image: z.string().trim().max(1000).optional(),
  recipient: z.string().trim().max(200).optional(),
  proofUrl: z.string().trim().max(1000).optional(),
  status: zStatus.optional(),
  priority: z.coerce.number().int().min(0).max(9999).optional(),
  featured: z.boolean().optional(),
};

export const achievementCreateSchema = z.object(achievementFields);
export const achievementUpdateSchema = z.object(achievementFields).partial();

export const achievementPublicQuerySchema = z.object({
  ...publicListBase,
  category: z.string().trim().optional(),
});

export const achievementAdminQuerySchema = z.object({
  ...adminListBase,
  category: z.string().trim().optional(),
});

export { bulkBodySchema, featuredBodySchema, reorderBodySchema, statusBodySchema };