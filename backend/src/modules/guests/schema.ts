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

const guestFields = {
  name: z.string().trim().min(2).max(200),
  role: z.string().trim().max(200).optional(),
  organization: z.string().trim().max(200).optional(),
  bio: z.string().trim().max(5000).optional(),
  topic: z.string().trim().max(300).optional(),
  photo: z.string().trim().max(1000).optional(),
  visitDate: z.coerce.date().optional(),
  gallery: z.array(z.string().trim().min(1)).max(30).optional(),
  status: zStatus.optional(),
  priority: z.coerce.number().int().min(0).max(9999).optional(),
  featured: z.boolean().optional(),
};

export const guestCreateSchema = z.object(guestFields);
export const guestUpdateSchema = z.object(guestFields).partial();

export const guestPublicQuerySchema = z.object({
  ...publicListBase,
  organization: z.string().trim().optional(),
});

export const guestAdminQuerySchema = z.object({
  ...adminListBase,
  organization: z.string().trim().optional(),
});

export { bulkBodySchema, featuredBodySchema, reorderBodySchema, statusBodySchema };