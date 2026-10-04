import { z } from 'zod';
import {
  adminListBase,
  bulkBodySchema,
  featuredBodySchema,
  optionalSlug,
  publicListBase,
  reorderBodySchema,
  statusBodySchema,
  zStatus,
} from '../../lib/resource/schemas';

const projectFields = {
  name: z.string().trim().min(2).max(200),
  slug: optionalSlug,
  summary: z.string().trim().max(500).optional(),
  description: z.string().trim().max(5000).optional(),
  category: z.string().trim().max(100).optional(),
  tags: z.array(z.string().trim().min(1).max(50)).max(30).optional(),
  thumbnail: z.string().trim().max(1000).optional(),
  team: z.string().trim().max(200).optional(),
  links: z.record(z.string()).optional(),
  status: zStatus.optional(),
  priority: z.coerce.number().int().min(0).max(9999).optional(),
  featured: z.boolean().optional(),
};

export const projectCreateSchema = z.object(projectFields);
export const projectUpdateSchema = z.object(projectFields).partial();

export const projectPublicQuerySchema = z.object({
  ...publicListBase,
  category: z.string().trim().optional(),
  tag: z.string().trim().optional(),
});

export const projectAdminQuerySchema = z.object({
  ...adminListBase,
  category: z.string().trim().optional(),
  tag: z.string().trim().optional(),
});

export { bulkBodySchema, featuredBodySchema, reorderBodySchema, statusBodySchema };