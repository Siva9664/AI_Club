import { createResourceRoutes } from '../../lib/resource/routes';
import { projectMeta } from './controller';
import { projectConfig, projectService } from './service';

const routes = createResourceRoutes(projectService, projectConfig, {
  publicBeforeDetail: [{ path: '/meta', handler: projectMeta }],
});

export const projectPublicRouter = routes.publicRouter;
export const projectAdminRouter = routes.adminRouter;