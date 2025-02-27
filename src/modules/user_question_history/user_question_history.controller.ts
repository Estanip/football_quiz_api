import { Controller } from '@nestjs/common';
import { BaseController } from 'src/modules/shared/controllers/base.controller';
import { ResponseService } from 'src/modules/shared/services/success-response.service';
import { CreateUserQuestionHistoryDto } from 'src/modules/user_question_history/dto/create-user-question-history.dto';
import { GetUserQuestionHistoryDto } from 'src/modules/user_question_history/dto/get-user-question-history.dto';
import { UserQuestionHistoryEntity } from 'src/modules/user_question_history/entities/user_question_history.entity';
import { UserQuestionHistoryService } from 'src/modules/user_question_history/user_question_history.service';

@Controller('user_question_history')
export class UserQuestionHistoryController extends BaseController<
  UserQuestionHistoryEntity,
  CreateUserQuestionHistoryDto,
  GetUserQuestionHistoryDto
> {
  constructor(
    private readonly _userQuestionHistoryService: UserQuestionHistoryService,
    private readonly _responseService: ResponseService,
  ) {
    super(
      _userQuestionHistoryService,
      _responseService,
      CreateUserQuestionHistoryDto,
      GetUserQuestionHistoryDto,
    );
  }
}
