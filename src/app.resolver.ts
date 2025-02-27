import { Query, Resolver } from '@nestjs/graphql';
import { SkipThrottle } from '@nestjs/throttler';

@Resolver()
@SkipThrottle()
export class AppResolver {
  @Query(() => String)
  sayHello(): string {
    return 'Healthy';
  }
}
