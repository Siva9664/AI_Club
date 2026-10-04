import { prisma } from '../../lib/prisma';
import { createResourceService } from '../../lib/resource/service';
import type { ResourceConfig } from '../../lib/resource/types';
import * as schema from './schema';

export const memberConfig: ResourceConfig = {
  resourceType: 'members',
  delegate: () => prisma.member as any,
  titleField: 'name',
  searchable: ['name', 'email', 'role', 'group', 'bio'],
  exactFilters: ['group', 'role'],
  featuredFilter: true,
  defaultAdminSort: 'priority',
  publicSortFields: ['role', 'group'],
  createSchema: schema.memberCreateSchema,
  updateSchema: schema.memberUpdateSchema,
  publicListQuerySchema: schema.memberPublicQuerySchema,
  adminListQuerySchema: schema.memberAdminQuerySchema,
  statusSchema: schema.statusBodySchema,
  featuredSchema: schema.featuredBodySchema,
  reorderSchema: schema.reorderBodySchema,
  bulkSchema: schema.bulkBodySchema,
};

export const memberService = createResourceService(memberConfig);