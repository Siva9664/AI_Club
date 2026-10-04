import { createResourceRoutes } from '../../lib/resource/routes';
import { achievementConfig, achievementService } from './service';

const routes = createResourceRoutes(achievementService, achievementConfig);

export const achievementPublicRouter = routes.publicRouter;
export const achievementAdminRouter = routes.adminRouter;