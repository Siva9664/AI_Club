import { z } from 'zod';

export const CONTENT_KEYS = ['hero', 'overview', 'contact', 'socials'] as const;
export type ContentKey = (typeof CONTENT_KEYS)[number];

export const contentKeyParamSchema = z.object({
  key: z.enum(CONTENT_KEYS, { errorMap: () => ({ message: 'Unknown content key' }) }),
});

export const contentBodySchema = z.object({
  value: z.union([z.record(z.any()), z.array(z.any()), z.string(), z.number(), z.boolean()]),
});