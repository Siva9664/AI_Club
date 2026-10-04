import type { CookieOptions, Request, RequestHandler } from 'express';
import jwt from 'jsonwebtoken';
import type { Role } from '@prisma/client';
import { env, isProd } from '../config/env';
import { prisma } from '../lib/prisma';
import { AppError } from '../lib/errors';
import { asyncHandler } from '../lib/http';

export const AUTH_COOKIE = 'ai_club_token';

interface TokenPayload {
  sub: number;
  role: Role;
}

export function signToken(user: { id: number; role: Role }): string {
  return jwt.sign({ sub: user.id, role: user.role }, env.JWT_SECRET, {
    expiresIn: env.JWT_EXPIRES_IN as jwt.SignOptions['expiresIn'],
  });
}

export function authCookieOptions(): CookieOptions {
  return {
    httpOnly: true,
    sameSite: isProd ? 'none' : 'lax',
    secure: isProd,
    path: '/',
    maxAge: 7 * 24 * 60 * 60 * 1000,
  };
}

function extractToken(req: Request): string | undefined {
  const fromCookie = (req.cookies as Record<string, string> | undefined)?.[AUTH_COOKIE];
  if (fromCookie) return fromCookie;
  const header = req.headers.authorization;
  if (header?.startsWith('Bearer ')) return header.slice(7);
  return undefined;
}

/**
 * Requires a valid session. Reads the httpOnly cookie (or Bearer token) and
 * attaches the current user to `req.user`.
 */
export const authenticate: RequestHandler = asyncHandler(async (req, _res, next) => {
  const token = extractToken(req);
  if (!token) throw AppError.unauthorized('Authentication required');

  let payload: TokenPayload;
  try {
    payload = jwt.verify(token, env.JWT_SECRET) as TokenPayload;
  } catch {
    throw AppError.unauthorized('Invalid or expired session');
  }

  const user = await prisma.user.findUnique({ where: { id: Number(payload.sub) } });
  if (!user) throw AppError.unauthorized('Account no longer exists');

  req.user = { id: user.id, email: user.email, name: user.name, role: user.role };
  next();
});

/** Attaches the user when a valid session exists, but never rejects. */
export const optionalAuth: RequestHandler = asyncHandler(async (req, _res, next) => {
  const token = extractToken(req);
  if (!token) return next();
  try {
    const payload = jwt.verify(token, env.JWT_SECRET) as TokenPayload;
    const user = await prisma.user.findUnique({ where: { id: Number(payload.sub) } });
    if (user) {
      req.user = { id: user.id, email: user.email, name: user.name, role: user.role };
    }
  } catch {
    /* ignore invalid tokens on optional routes */
  }
  next();
});
