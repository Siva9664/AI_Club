import { Router } from 'express';
import { validate } from '../../middleware/validate';
import * as controller from './controller';
import { activityQuerySchema } from './schema';

/** Admin: GET /api/v1/admin/activity */
export const activityAdminRouter = Router();
activityAdminRouter.get('/', validate({ query: activityQuerySchema }), controller.list);