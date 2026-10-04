import { createResourceRoutes } from '../../lib/resource/routes';
import { guestConfig, guestService } from './service';

const routes = createResourceRoutes(guestService, guestConfig);

export const guestPublicRouter = routes.publicRouter;
export const guestAdminRouter = routes.adminRouter;