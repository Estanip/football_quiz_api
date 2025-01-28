import { SameSiteType } from 'csrf-csrf';
import { CookieOptions } from 'express';

export function _setCookiesOptions(
  httpOnly: boolean,
  minutes: number,
  sameSite: SameSiteType = 'strict',
): CookieOptions {
  return {
    httpOnly,
    secure: process.env.NODE_ENV === 'production',
    maxAge: minutes * 60 * 1000,
    path: '/',
    sameSite,
  };
}
