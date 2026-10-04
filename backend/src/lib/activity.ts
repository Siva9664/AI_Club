import type { Prisma, PrismaClient } from '@prisma/client';
import { prisma } from './prisma';
import { logger } from './logger';

export interface ActivityInput {
  action: string;
  resourceType: string;
  resourceId?: number | null;
  title?: string;
  userId?: number | null;
}

type Db = PrismaClient | Prisma.TransactionClient;

/**
 * Appends an audit row for an admin write. Accepts a transaction client so the
 * log can be written atomically with the change it describes.
 */
export async function recordActivity(db: Db, input: ActivityInput): Promise<void> {
  try {
    await db.activityLog.create({
      data: {
        action: input.action,
        resourceType: input.resourceType,
        resourceId: input.resourceId ?? null,
        title: input.title ?? '',
        userId: input.userId ?? null,
      },
    });
  } catch (error) {
    // An audit failure must never break the caller's request.
    logger.error({ err: error, input }, 'Failed to write activity log');
  }
}

export function recordActivityWithClient(input: ActivityInput) {
  return recordActivity(prisma, input);
}
