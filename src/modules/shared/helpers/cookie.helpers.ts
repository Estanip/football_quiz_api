import { SameSiteType } from 'csrf-csrf';
import { CookieOptions } from 'express';

export function _setCookiesOptions(
  days: number = 1,
  httpOnly: boolean = true,
  sameSite: SameSiteType = 'lax',
): CookieOptions {
  return {
    httpOnly,
    secure: process.env.NODE_ENV === 'production',
    maxAge: days * 24 * 60 * 60 * 1000,
    path: '/',
    sameSite,
  };
}
