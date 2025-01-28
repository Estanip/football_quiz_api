import { doubleCsrf } from 'csrf-csrf';

const csrf = doubleCsrf({
  getSecret: () => process.env.CSRF_SECRET,
});

export const doubleCsrfProtection = csrf.doubleCsrfProtection;
export const generateCsrfoken = csrf.generateToken;
export const invalidCsrfTokenError: any = csrf.invalidCsrfTokenError;
export const validateCsrfRequest = csrf.validateRequest;
