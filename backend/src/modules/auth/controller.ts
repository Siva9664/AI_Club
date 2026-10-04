import { asyncHandler, sendData } from '../../lib/http';
import { AUTH_COOKIE, authCookieOptions } from '../../middleware/auth';
import * as service from './service';

/** POST /auth/login – sets an httpOnly cookie and returns the user. */
export const login = asyncHandler(async (req, res) => {
  const { token, user } = await service.login(req.body);
  res.cookie(AUTH_COOKIE, token, authCookieOptions());
  sendData(res, { token, user });
});

/** POST /auth/logout – clears the session cookie. */
export const logout = asyncHandler(async (_req, res) => {
  res.clearCookie(AUTH_COOKIE, { ...authCookieOptions(), maxAge: undefined });
  sendData(res, { success: true });
});

/** GET /auth/me – returns the signed-in user. */
export const me = asyncHandler(async (req, res) => {
  const user = await service.getCurrentUser(req.user!.id);
  sendData(res, user);
});