import type { NextFunction, Request, RequestHandler, Response } from 'express';

/** Wraps an async route handler so rejected promises reach the error middleware. */
export const asyncHandler =
  (fn: (req: Request, res: Response, next: NextFunction) => Promise<unknown>): RequestHandler =>
  (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };

export interface ListMeta {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

/** { data: {...} } */
export function sendData<T>(res: Response, data: T, status = 200): void {
  res.status(status).json({ data });
}

/** { data: [...], meta: { page, limit, total, totalPages } } */
export function sendList<T>(res: Response, data: T[], meta: ListMeta): void {
  res.status(200).json({ data, meta });
}
