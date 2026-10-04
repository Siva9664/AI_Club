import { PrismaClient } from '@prisma/client';
import { isProd } from '../config/env';

/**
 * A single PrismaClient instance for the whole process.
 * Guarded with a global so `tsx watch` hot reloads don't leak connections.
 */
const globalForPrisma = globalThis as unknown as { prisma?: PrismaClient };

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    log: isProd ? ['error'] : ['warn', 'error'],
  });

if (!isProd) {
  globalForPrisma.prisma = prisma;
}
