import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { JwtService } from '@nestjs/jwt';
import { Observable } from 'rxjs';
import { HostType } from 'src/common/constants/host_types.constants';
import { _setCookiesOptions } from 'src/modules/shared/helpers/cookie.helpers';

@Injectable()
export class TokenRenewalInterceptor implements NestInterceptor {
  constructor(private readonly jwtService: JwtService) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const contextType = context.getType() as HostType;

    let request: any;
    let response: any;

    if (contextType === 'graphql') {
      const gqlContext = GqlExecutionContext.create(context);
      request = gqlContext.getContext().req;
      response = gqlContext.getContext().res;
    } else {
      const ctx = context.switchToHttp();
      request = ctx.getRequest();
      response = ctx.getResponse();
    }

    const token = request.cookies?.access_token;

    if (token) {
      try {
        const payload = this.jwtService.decode(token) as any;
        const exp = payload.exp * 1000;
        const currentTime = Date.now();

        // If less than 10 minutes left to expire, renew token for 1 day
        if (exp - currentTime < 10 * 60 * 1000) {
          const newToken = this.jwtService.sign(
            { id: payload.id, email: payload.email, role: payload.role },
            { expiresIn: '24h' },
          );

          response.cookie('access_token', newToken, _setCookiesOptions());
        }
      } catch (error) {
        console.error('Error decoding or renewing token:', error);
      }
    }

    return next.handle();
  }
}
