import { prisma } from '../../lib/prisma';
import { createResourceService } from '../../lib/resource/service';
import type { ResourceConfig } from '../../lib/resource/types';
import * as schema from './schema';

export const projectConfig: ResourceConfig = {
  resourceType: 'projects',
  delegate: () => prisma.project as any,
  slugField: 'slug',
  slugSource: 'name',
  titleField: 'name',
  searchable: ['name', 'summary', 'description', 'category'],
  exactFilters: ['category'],
  featuredFilter: true,
  tagField: 'tags',
  defaultAdminSort: 'priority',
  publicSortFields: ['category'],
  createSchema: schema.projectCreateSchema,
  updateSchema: schema.projectUpdateSchema,
  publicListQuerySchema: schema.projectPublicQuerySchema,
  adminListQuerySchema: schema.projectAdminQuerySchema,
  statusSchema: schema.statusBodySchema,
  featuredSchema: schema.featuredBodySchema,
  reorderSchema: schema.reorderBodySchema,
  bulkSchema: schema.bulkBodySchema,
};

export const projectService = createResourceService(projectConfig);