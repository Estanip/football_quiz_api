import { ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Reflector } from '@nestjs/core';
import { GqlExecutionContext } from '@nestjs/graphql';
import { AuthGuard } from '@nestjs/passport';
import { Observable } from 'rxjs';

@Injectable()
export class JwtCookieAuthGuard extends AuthGuard('jwt-cookie') {
  constructor(
    private _configService: ConfigService,
    private _reflector: Reflector,
  ) {
    super();
  }

  getRequest(context: ExecutionContext) {
    const ctx = GqlExecutionContext.create(context);
    return ctx.getContext().req;
  }

  canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
    const isPublic = this._reflector.getAllAndOverride<boolean>(
      this._configService.get('keys.is_public'),
      [context.getHandler(), context.getClass()],
    );
    if (isPublic) return true;

    return super.canActivate(context);
  }

  handleRequest(err, user, info) {
    if (err || !user) {
      if (info.message === 'jwt expired') throw new UnauthorizedException('Token expired');
      else if (info.message === 'No auth token')
        throw new UnauthorizedException('Token not provided');
      else throw new UnauthorizedException('Authentication failed');
    }
    return user;
  }
}
