import { ApiProperty, OmitType } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsBoolean, IsInt } from 'class-validator';
import { Level } from 'src/constants/level';
import { QuestionEntity } from 'src/modules/question/entities/question.entity';
import { UserEntity } from 'src/modules/user/entities/user.entity';
import { CreateUserQuestionHistoryDto } from 'src/modules/user_question_history/dto/create-user-question-history.dto';

export class GetUserQuestionHistoryDto extends OmitType(CreateUserQuestionHistoryDto, [
  'isActive',
  'answer',
  'question',
  'user',
] as const) {
  @ApiProperty()
  @IsInt()
  id: number;

  @ApiProperty()
  @Type(() => UserEntity)
  user: UserEntity;

  @ApiProperty()
  @Type(() => QuestionEntity)
  question: QuestionEntity;

  @ApiProperty()
  level: Level;

  @ApiProperty()
  @IsBoolean()
  isCorrect: boolean;
}
