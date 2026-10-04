import { Router } from 'express';
import { validate } from '../../middleware/validate';
import * as controller from './controller';
import { contentBodySchema, contentKeyParamSchema } from './schema';

/** Public club info: GET /api/v1/club */
export const clubRouter = Router();
clubRouter.get('/', controller.club);

/** Admin site-content routes mounted under /api/v1/admin/site-content */
export const siteContentAdminRouter = Router();
siteContentAdminRouter.get('/', controller.list);
siteContentAdminRouter.get(
  '/:key',
  validate({ params: contentKeyParamSchema }),
  controller.getOne
);
siteContentAdminRouter.put(
  '/:key',
  validate({ params: contentKeyParamSchema, body: contentBodySchema }),
  controller.update
);