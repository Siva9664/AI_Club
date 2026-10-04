import { prisma } from '../../lib/prisma';
import { createResourceService } from '../../lib/resource/service';
import type { ResourceConfig } from '../../lib/resource/types';
import * as schema from './schema';

export const guestConfig: ResourceConfig = {
  resourceType: 'guests',
  delegate: () => prisma.guest as any,
  titleField: 'name',
  searchable: ['name', 'role', 'organization', 'topic', 'bio'],
  exactFilters: ['organization'],
  featuredFilter: true,
  yearField: 'visitDate',
  defaultAdminSort: 'priority',
  publicSortFields: ['visitDate', 'organization'],
  createSchema: schema.guestCreateSchema,
  updateSchema: schema.guestUpdateSchema,
  publicListQuerySchema: schema.guestPublicQuerySchema,
  adminListQuerySchema: schema.guestAdminQuerySchema,
  statusSchema: schema.statusBodySchema,
  featuredSchema: schema.featuredBodySchema,
  reorderSchema: schema.reorderBodySchema,
  bulkSchema: schema.bulkBodySchema,
};

export const guestService = createResourceService(guestConfig);