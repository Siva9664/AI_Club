import { Router } from 'express';
import { authenticate } from '../../middleware/auth';
import { loginRateLimiter } from '../../middleware/rateLimit';
import { validate } from '../../middleware/validate';
import * as controller from './controller';
import { loginSchema } from './schema';

/** Public auth routes mounted at /api/v1/auth. */
export const authRouter = Router();

authRouter.post('/login', loginRateLimiter, validate({ body: loginSchema }), controller.login);
authRouter.post('/logout', controller.logout);
authRouter.get('/me', authenticate, controller.me);