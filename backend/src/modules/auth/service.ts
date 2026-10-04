import bcrypt from 'bcrypt';
import { prisma } from '../../lib/prisma';
import { AppError } from '../../lib/errors';
import { serializeUser } from '../../lib/serialize';
import { signToken } from '../../middleware/auth';
import type { LoginInput } from './schema';

/** Verifies credentials and returns the user plus a signed token. */
export async function login(input: LoginInput) {
  const user = await prisma.user.findUnique({ where: { email: input.email.toLowerCase() } });
  if (!user) throw AppError.unauthorized('Invalid email or password');

  const ok = await bcrypt.compare(input.password, user.passwordHash);
  if (!ok) throw AppError.unauthorized('Invalid email or password');

  const token = signToken({ id: user.id, role: user.role });
  return { token, user: serializeUser(user) };
}

/** Loads the current user (used by GET /auth/me). */
export async function getCurrentUser(id: number) {
  const user = await prisma.user.findUnique({ where: { id } });
  if (!user) throw AppError.unauthorized('Account no longer exists');
  return serializeUser(user);
}