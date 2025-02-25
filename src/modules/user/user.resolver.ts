import { Context, Query, Resolver } from '@nestjs/graphql';
import { UserEntity } from 'src/modules/user/entities/user.entity';
import { UserService } from 'src/modules/user/user.service';

@Resolver(() => UserEntity)
export class UserResolver {
  constructor(private readonly _userService: UserService) {}

  @Query(() => UserEntity, { name: 'getUserById' })
  async getUserById(@Context() context): Promise<Partial<UserEntity>> {
    const userId = context.req.user.id;
    return await this._userService.findById(userId);
  }
}
