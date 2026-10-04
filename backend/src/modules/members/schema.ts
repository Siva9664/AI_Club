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

const memberFields = {
  name: z.string().trim().min(2).max(200),
  email: z.string().trim().email('Enter a valid email').max(200).optional(),
  role: z.string().trim().max(100).optional(),
  group: z.string().trim().max(100).optional(),
  bio: z.string().trim().max(5000).optional(),
  photo: z.string().trim().max(1000).optional(),
  links: z.record(z.string()).optional(),
  status: zStatus.optional(),
  priority: z.coerce.number().int().min(0).max(9999).optional(),
  featured: z.boolean().optional(),
};

export const memberCreateSchema = z.object(memberFields);
export const memberUpdateSchema = z.object(memberFields).partial();

export const memberPublicQuerySchema = z.object({
  ...publicListBase,
  group: z.string().trim().optional(),
});

export const memberAdminQuerySchema = z.object({
  ...adminListBase,
  group: z.string().trim().optional(),
});

export { bulkBodySchema, featuredBodySchema, reorderBodySchema, statusBodySchema };