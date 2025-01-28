import { ArgumentsHost, Catch, ExceptionFilter, HttpException } from '@nestjs/common';
import { Request, Response } from 'express';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const status = exception?.getStatus();
    const exceptionError = exception?.getResponse() as { message: string; error: string };

    response.status(status).json({
      error: exceptionError?.error || exceptionError,
      statusCode: status,
      message: exceptionError?.message || exception?.message,
      timestamp: new Date().toISOString(),
      path: request.url,
    });
  }
}
