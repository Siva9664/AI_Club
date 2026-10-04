import { Router, type RequestHandler } from 'express';
import { validate } from '../../middleware/validate';
import { createResourceController } from './controller';
import type { ResourceService } from './service';
import type { ResourceConfig } from './types';

export interface ResourceRoutes {
  publicRouter: Router;
  adminRouter: Router;
}

export interface ResourceRouteOptions {
  /** Extra public routes registered before the `/:key` detail route (e.g. /meta). */
  publicBeforeDetail?: Array<{ path: string; handler: RequestHandler }>;
}

/**
 * Builds a public router (approved items only) and an admin router (full CRUD)
 * for a managed resource.
 */
export function createResourceRoutes(
  service: ResourceService,
  config: ResourceConfig,
  options: ResourceRouteOptions = {}
): ResourceRoutes {
  const controller = createResourceController(service);

  const publicRouter = Router();
  publicRouter.get('/', validate({ query: config.publicListQuerySchema }), controller.publicList);
  (options.publicBeforeDetail ?? []).forEach((route) => {
    publicRouter.get(route.path, route.handler);
  });
  publicRouter.get('/:key', controller.publicGet);

  const adminRouter = Router();
  adminRouter.get('/', validate({ query: config.adminListQuerySchema }), controller.adminList);
  // Static sub-paths must be declared before the `/:id` routes.
  adminRouter.put('/reorder', validate({ body: config.reorderSchema }), controller.reorder);
  adminRouter.post('/bulk', validate({ body: config.bulkSchema }), controller.bulk);
  adminRouter.post('/', validate({ body: config.createSchema }), controller.create);
  adminRouter.get('/:id', controller.adminGet);
  adminRouter.put('/:id', validate({ body: config.updateSchema }), controller.update);
  adminRouter.delete('/:id', controller.remove);
  adminRouter.post('/:id/restore', controller.restore);
  adminRouter.patch('/:id/status', validate({ body: config.statusSchema }), controller.setStatus);
  adminRouter.patch('/:id/featured', validate({ body: config.featuredSchema }), controller.setFeatured);

  return { publicRouter, adminRouter };
}

