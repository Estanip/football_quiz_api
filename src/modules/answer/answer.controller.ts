import { Controller } from '@nestjs/common';
import { AnswerEntity } from 'src/modules/answer/entities/answer.entity';
import { BaseController } from 'src/modules/shared/controllers/base-controller';
import { ResponseService } from 'src/modules/shared/services/success-response.service';

import { AnswerService } from './answer.service';
import { CreateAnswerDto } from './dto/create-answer.dto';
import { GetAnswerDto } from './dto/get-answer.dto';

@Controller('answer')
export class AnswerController extends BaseController<AnswerEntity, CreateAnswerDto, GetAnswerDto> {
  constructor(
    private readonly _answerService: AnswerService,
    private readonly _responseService: ResponseService,
  ) {
    super(_answerService, _responseService, CreateAnswerDto, GetAnswerDto);
  }
}
