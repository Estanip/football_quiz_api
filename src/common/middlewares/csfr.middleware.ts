import { Injectable, NestMiddleware, UnauthorizedException } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
import { csrfIgnoredMethods, noCSFRRoutes } from 'src/common/constants/csrf.constants';
import {
  doubleCsrfProtection,
  invalidCsrfTokenError,
  validateCsrfRequest,
} from 'src/configuration/csrf.config';

@Injectable()
export class CsrfMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    if (noCSFRRoutes.includes(req.url) || csrfIgnoredMethods.includes(req.method)) return next();
    else if (validateCsrfRequest(req)) return next();
    else if (invalidCsrfTokenError) throw new UnauthorizedException('Invalid CSRF token');

    return doubleCsrfProtection(req, res, next);
  }
}
