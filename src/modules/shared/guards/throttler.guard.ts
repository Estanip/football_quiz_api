import { ExecutionContext, Injectable } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { ThrottlerException, ThrottlerGuard } from '@nestjs/throttler';
import { HostType } from 'src/common/constants/host_types.constants';

@Injectable()
export class GqlThrottlerGuard extends ThrottlerGuard {
  getRequestResponse(context: ExecutionContext) {
    // GRAPHQL
    if ((context.getType() as HostType) === 'graphql') {
      const gqlCtx = GqlExecutionContext.create(context);
      const ctx = gqlCtx.getContext();
      return { req: ctx.req, res: ctx.res };
    }

    // HTTP
    const httpCtx = context.switchToHttp();
    return { req: httpCtx.getRequest(), res: httpCtx.getResponse() };
  }

  protected throwThrottlingException(): any {
    throw new ThrottlerException(
      'You have exceeded the maximum number of requests allowed. Please try again later.',
    );
  }
}
