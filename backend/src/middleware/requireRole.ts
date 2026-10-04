import type { RequestHandler } from 'express';
import type { Role } from '@prisma/client';
import { AppError } from '../lib/errors';

/** Allows the request only when the authenticated user holds one of `roles`. */
export const requireRole =
  (...roles: Role[]): RequestHandler =>
  (req, _res, next) => {
    if (!req.user) {
      return next(AppError.unauthorized('Authentication required'));
    }
    if (!roles.includes(req.user.role)) {
      return next(AppError.forbidden('You do not have permission to perform this action'));
    }
    return next();
  };
