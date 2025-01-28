import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { Role } from 'src/constants/role';
import { BaseController } from 'src/modules/shared/controllers/base-controller';
import { Roles } from 'src/modules/shared/decorators/roles.decorator';
import { SuccessResponseDto } from 'src/modules/shared/dto/success-response.dto';
import { ResponseService } from 'src/modules/shared/services/success-response.service';
import { CreateUserAnswerDto } from 'src/modules/user_answer/dto/create-user-answer.dto';
import { GetUserAnswerDto } from 'src/modules/user_answer/dto/get-user-answer.dto';
import { UserAnswerEntity } from 'src/modules/user_answer/entities/user_answer.entity';
import { UserAnswerService } from 'src/modules/user_answer/user_answer.service';

@Controller('user_answer')
export class UserAnswerController extends BaseController<
  UserAnswerEntity,
  CreateUserAnswerDto,
  GetUserAnswerDto
> {
  constructor(
    private readonly _userAnswerService: UserAnswerService,
    private readonly _responseService: ResponseService,
  ) {
    super(_userAnswerService, _responseService, CreateUserAnswerDto, GetUserAnswerDto);
  }

  @Post()
  @HttpCode(201)
  @Roles(Role.Admin)
  async create(@Body() data: CreateUserAnswerDto): Promise<SuccessResponseDto<UserAnswerEntity>> {
    const createdEntity = await this._userAnswerService.createAnswer(data);
    return this._responseService.success(
      true,
      HttpStatus.CREATED,
      'Entity created successfully',
      createdEntity,
    );
  }
}
