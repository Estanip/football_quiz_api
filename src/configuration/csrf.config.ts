import { doubleCsrf } from 'csrf-csrf';

const csrf = doubleCsrf({
  getSecret: () => process.env.CSRF_SECRET,
  cookieName: 'XSRF-TOKEN',
  cookieOptions: {
    httpOnly: false,
    secure: false,
    sameSite: 'strict',
  },
  getTokenFromRequest: (req) => req.headers['x-csrf-token'],
});

export const generateCsrfoken = csrf.generateToken;
export const validateCsrfRequest = csrf.validateRequest;
