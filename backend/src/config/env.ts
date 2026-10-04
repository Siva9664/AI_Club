import 'dotenv/config';
import { z } from 'zod';

/**
 * Validated, typed environment configuration.
 * Defaults let the app boot in development/test without a .env file.
 */
const envSchema = z.object({
  NODE_ENV: z.enum(['development', 'test', 'production']).default('development'),
  PORT: z.coerce.number().int().positive().default(4000),
  DATABASE_URL: z
    .string()
    .default('postgresql://aiclub:aiclub@localhost:5433/aiclub?schema=public'),
  JWT_SECRET: z.string().min(1).default('dev-secret-change-me'),
  JWT_EXPIRES_IN: z.string().default('7d'),
  CORS_ORIGIN: z.string().default('http://localhost:5173'),
  ADMIN_EMAIL: z.string().default('admin@club.test'),
  ADMIN_PASSWORD: z.string().default('admin123'),
  ADMIN_NAME: z.string().default('Club Admin'),
  PUBLIC_BASE_URL: z.string().default('http://localhost:4000'),
});

const parsed = envSchema.safeParse(process.env);

if (!parsed.success) {
  // eslint-disable-next-line no-console
  console.error('Invalid environment configuration:', parsed.error.flatten().fieldErrors);
  throw new Error('Invalid environment configuration');
}

export const env = parsed.data;
export const isProd = env.NODE_ENV === 'production';
export const isTest = env.NODE_ENV === 'test';

if (isProd && env.JWT_SECRET === 'dev-secret-change-me') {
  // eslint-disable-next-line no-console
  console.warn('[warn] JWT_SECRET is using the insecure default in production!');
}
