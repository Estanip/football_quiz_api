import { ArgumentsHost, Catch, ExceptionFilter, HttpException } from '@nestjs/common';
import { GqlArgumentsHost } from '@nestjs/graphql';
import { Request, Response } from 'express';
import { HostType, HostTypes } from 'src/common/constants/host_types.constants';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const status = exception?.getStatus();
    const exceptionError = exception?.getResponse() as { message: string; error: string };
    const hostType = host.getType() as HostType;

    if (hostType === HostTypes.GRAPHQL) {
      const gqlHost = GqlArgumentsHost.create(host);
      const path = gqlHost.getInfo().path.key;

      throw new HttpException(
        {
          error: exceptionError?.error || exceptionError,
          statusCode: status,
          message: exceptionError?.message || exception?.message,
          timestamp: new Date().toISOString(),
          path: `graphql/${path}`,
        },
        status,
      );
    } else
      response.status(status).json({
        error: exceptionError?.error || exceptionError,
        statusCode: status,
        message: exceptionError?.message || exception?.message,
        timestamp: new Date().toISOString(),
        path: request.url,
      });
  }
}
