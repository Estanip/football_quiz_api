import { Controller } from '@nestjs/common';
import { BaseController } from 'src/modules/shared/controllers/base-controller';
import { ResponseService } from 'src/modules/shared/services/success-response.service';
import { CreateUserDto } from 'src/modules/user/dto/create-user.dto';
import { GetUserDto } from 'src/modules/user/dto/get-user.dto';
import { UserEntity } from 'src/modules/user/entities/user.entity';
import { UserService } from 'src/modules/user/user.service';

@Controller('user')
export class UserController extends BaseController<UserEntity, CreateUserDto, GetUserDto> {
  constructor(
    private readonly _userService: UserService,
    private readonly _responseService: ResponseService,
  ) {
    super(_userService, _responseService, CreateUserDto, GetUserDto);
  }
}
