import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Observable } from 'rxjs';

@Injectable()
export class TokenRenewalInterceptor implements NestInterceptor {
  constructor(private readonly jwtService: JwtService) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const ctx = context.switchToHttp();
    const request = ctx.getRequest();
    const response = ctx.getResponse();

    const token = request.cookies?.access_token;

    if (token) {
      try {
        const payload = this.jwtService.decode(token) as any;
        const exp = payload.exp * 1000;
        const currentTime = Date.now();

        // If less than 10 minutes left to expire, renew token
        if (exp - currentTime < 10 * 60 * 1000) {
          const newToken = this.jwtService.sign(
            { id: payload.id, email: payload.email, role: payload.role },
            { expiresIn: '1h' },
          );

          response.cookie('access_token', newToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            maxAge: 60 * 60 * 1000,
            sameSite: 'Strict',
            path: '/',
          });
        }
      } catch (error) {
        console.error('Error decoding or renewing token:', error);
      }
    }

    return next.handle();
  }
}
