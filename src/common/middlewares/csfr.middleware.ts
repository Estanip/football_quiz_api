import { Injectable, NestMiddleware, UnauthorizedException } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
import { noCSFRRoutes } from 'src/common/constants/csrf.constants';
import { validateCsrfRequest } from 'src/configuration/csrf.config';

@Injectable()
export class CsrfMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    if (['PATCH', 'POST', 'DELETE'].includes(req.method)) {
      if (noCSFRRoutes.includes(req.url) || req.path === '/graphql') return next();

      const isValid = validateCsrfRequest(req);

      if (!isValid) throw new UnauthorizedException('Invalid CSRF token');
    }

    return next();
  }
}
