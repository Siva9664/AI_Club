import type { RequestHandler } from 'express';
import type { ZodTypeAny } from 'zod';
import { AppError } from '../lib/errors';

export interface ValidationSchemas {
  body?: ZodTypeAny;
  query?: ZodTypeAny;
  params?: ZodTypeAny;
}

/**
 * Validates and replaces `req.body`, `req.query` and `req.params` with the
 * parsed (and coerced) values. On failure responds with 422 and field detail.
 */
export const validate =
  (schemas: ValidationSchemas): RequestHandler =>
  (req, _res, next) => {
    const details: Record<string, string> = {};

    (['body', 'query', 'params'] as const).forEach((key) => {
      const schema = schemas[key];
      if (!schema) return;

      const result = schema.safeParse(req[key]);
      if (!result.success) {
        result.error.issues.forEach((issue) => {
          const field = issue.path.join('.') || key;
          const name = key === 'body' ? field : `${key}.${field}`;
          if (!details[name]) details[name] = issue.message;
        });
        return;
      }

      if (key === 'body') {
        req.body = result.data;
      } else {
        // req.query in Express 4 is a getter; redefine it with the parsed value.
        Object.defineProperty(req, key, {
          value: result.data,
          writable: true,
          configurable: true,
          enumerable: true,
        });
      }
    });

    if (Object.keys(details).length > 0) {
      return next(AppError.validation('Please fix the highlighted fields', details));
    }
    return next();
  };
