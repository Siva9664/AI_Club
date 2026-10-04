import { prisma } from '../../lib/prisma';
import { asyncHandler, sendData } from '../../lib/http';
import { createResourceController } from '../../lib/resource/controller';
import { projectService } from './service';

export const projectController = createResourceController(projectService);

/** GET /projects/meta – filter options for the public Projects page. */
export const projectMeta = asyncHandler(async (_req, res) => {
  const rows = await prisma.project.findMany({
    where: { deletedAt: null, status: 'APPROVED' },
    select: { category: true, tags: true },
  });

  const categories = [...new Set(rows.map((row) => row.category).filter(Boolean))] as string[];
  const tags = [...new Set(rows.flatMap((row) => row.tags))].sort();

  sendData(res, {
    categories: categories.sort(),
    tags,
    statuses: ['draft', 'pending', 'approved', 'rejected'],
  });
});