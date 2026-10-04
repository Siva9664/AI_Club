import { Router } from 'express';
import { validate } from '../../middleware/validate';
import * as controller from './controller';
import { homeLayoutBodySchema } from './schema';

/** Public: GET /api/v1/home */
export const homeRouter = Router();
homeRouter.get('/', controller.home);

/** Admin: GET/PUT /api/v1/admin/home-layout */
export const homeLayoutAdminRouter = Router();
homeLayoutAdminRouter.get('/', controller.getLayout);
homeLayoutAdminRouter.put('/', validate({ body: homeLayoutBodySchema }), controller.replaceLayout);