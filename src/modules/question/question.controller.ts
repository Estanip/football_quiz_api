import { Controller, Get, HttpStatus, Param, Req } from '@nestjs/common';
import { Level } from 'src/constants/level';
import { CreateQuestionDto } from 'src/modules/question/dto/create-question.dto';
import { GetQuestionDto } from 'src/modules/question/dto/get-question.dto';
import { QuestionEntity } from 'src/modules/question/entities/question.entity';
import { QuestionService } from 'src/modules/question/question.service';
import { BaseController } from 'src/modules/shared/controllers/base.controller';
import { ResponseService } from 'src/modules/shared/services/success-response.service';

@Controller('question')
export class QuestionController extends BaseController<
  QuestionEntity,
  CreateQuestionDto,
  GetQuestionDto
> {
  constructor(
    private readonly _questionService: QuestionService,
    private readonly _responseService: ResponseService,
  ) {
    super(_questionService, _responseService, CreateQuestionDto, GetQuestionDto);
  }

  @Get('/:subcategory/:level')
  async getQuestionsBySubcategoryAndLevel(
    @Req() req,
    @Param('subcategory') subcategory: number,
    @Param('level') level: Level,
  ) {
    const questions = await this._questionService.findForUserBySubcategoryAndLevel(
      req.user.id,
      subcategory,
      level,
    );
    return this._responseService.success(
      true,
      HttpStatus.FOUND,
      'Questions successfully found',
      questions,
    );
  }
}
