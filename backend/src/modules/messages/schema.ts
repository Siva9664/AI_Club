import { z } from 'zod';

/** Public contact form payload – matches the docx validation rules. */
export const contactSchema = z.object({
  name: z.string().trim().min(2, 'Name must be 2–80 characters').max(80, 'Name must be 2–80 characters'),
  email: z.string().trim().email('Enter a valid email'),
  phone: z
    .string()
    .trim()
    .regex(/^[+]?[0-9\s-]{8,15}$/, 'Enter a valid phone number')
    .optional()
    .or(z.literal('')),
  role: z.string().trim().max(50).optional(),
  message: z
    .string()
    .trim()
    .min(10, 'Message must be 10–1000 characters')
    .max(1000, 'Message must be 10–1000 characters'),
});

export const messageListQuerySchema = z.object({
  page: z.coerce.number().int().positive().optional(),
  limit: z.coerce.number().int().positive().max(100).optional(),
  read: z
    .preprocess((v) => (v === 'true' ? true : v === 'false' ? false : v), z.boolean())
    .optional(),
  q: z.string().trim().optional(),
});