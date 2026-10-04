import { prisma } from '../../lib/prisma';
import { createResourceService } from '../../lib/resource/service';
import type { ResourceConfig } from '../../lib/resource/types';
import * as schema from './schema';

export const achievementConfig: ResourceConfig = {
  resourceType: 'achievements',
  delegate: () => prisma.achievement as any,
  titleField: 'name',
  searchable: ['name', 'description', 'category', 'recipient'],
  exactFilters: ['category'],
  featuredFilter: true,
  yearField: 'year',
  defaultAdminSort: 'priority',
  publicSortFields: ['category'],
  createSchema: schema.achievementCreateSchema,
  updateSchema: schema.achievementUpdateSchema,
  publicListQuerySchema: schema.achievementPublicQuerySchema,
  adminListQuerySchema: schema.achievementAdminQuerySchema,
  statusSchema: schema.statusBodySchema,
  featuredSchema: schema.featuredBodySchema,
  reorderSchema: schema.reorderBodySchema,
  bulkSchema: schema.bulkBodySchema,
};

export const achievementService = createResourceService(achievementConfig);