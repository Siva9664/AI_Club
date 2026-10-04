import { createResourceRoutes } from '../../lib/resource/routes';
import { memberConfig, memberService } from './service';

const routes = createResourceRoutes(memberService, memberConfig);

export const memberPublicRouter = routes.publicRouter;
export const memberAdminRouter = routes.adminRouter;