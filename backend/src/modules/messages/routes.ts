import { Router } from 'express';
import { contactRateLimiter } from '../../middleware/rateLimit';
import { validate } from '../../middleware/validate';
import * as controller from './controller';
import { contactSchema, messageListQuerySchema } from './schema';

/** Public contact form: POST /api/v1/contact */
export const contactRouter = Router();
contactRouter.post('/', contactRateLimiter, validate({ body: contactSchema }), controller.submit);

/** Admin inbox: /api/v1/admin/messages */
export const messagesAdminRouter = Router();
messagesAdminRouter.get('/', validate({ query: messageListQuerySchema }), controller.list);
messagesAdminRouter.patch('/:id/read', controller.markRead);
messagesAdminRouter.delete('/:id', controller.remove);