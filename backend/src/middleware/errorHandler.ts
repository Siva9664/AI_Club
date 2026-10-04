import type { ErrorRequestHandler, RequestHandler } from 'express';
import { Prisma } from '@prisma/client';
import { MulterError } from 'multer';
import { ZodError } from 'zod';
import { AppError, type ErrorCode } from '../lib/errors';
import { logger } from '../lib/logger';

interface ErrorBody {
  code: ErrorCode;
  message: string;
  details?: unknown;
}

function jsonError(body: ErrorBody) {
  return { error: body };
}

/** Terminal 404 handler – runs when no route matched. */
export const notFoundHandler: RequestHandler = (req, _res, next) => {
  next(AppError.notFound(`Route ${req.method} ${req.originalUrl} not found`));
};

/** Central error handler – converts thrown values into the standard envelope. */
export const errorHandler: ErrorRequestHandler = (err, _req, res, _next) => {
  if (err instanceof AppError) {
    res.status(err.status).json(
      jsonError({ code: err.code, message: err.message, ...(err.details ? { details: err.details } : {}) })
    );
    return;
  }

  if (err instanceof MulterError) {
    const message =
      err.code === 'LIMIT_FILE_SIZE'
        ? 'Image must be 2 MB or smaller'
        : `Upload error: ${err.message}`;
    res.status(422).json(jsonError({ code: 'VALIDATION_ERROR', message, details: { file: message } }));
    return;
  }

  if (err instanceof ZodError) {
    const details: Record<string, string> = {};
    err.issues.forEach((issue) => {
      details[issue.path.join('.') || 'body'] = issue.message;
    });
    res.status(422).json(jsonError({ code: 'VALIDATION_ERROR', message: 'Validation failed', details }));
    return;
  }

  if (err instanceof Prisma.PrismaClientKnownRequestError) {
    if (err.code === 'P2002') {
      res.status(409).json(
        jsonError({
          code: 'CONFLICT',
          message: 'A record with these unique values already exists',
          details: { fields: err.meta?.target },
        })
      );
      return;
    }
    if (err.code === 'P2025') {
      res.status(404).json(jsonError({ code: 'NOT_FOUND', message: 'Resource not found' }));
      return;
    }
  }

  logger.error({ err }, 'Unhandled error');
  res.status(500).json(jsonError({ code: 'SERVER_ERROR', message: 'Something went wrong' }));
};
