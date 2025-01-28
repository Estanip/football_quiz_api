import { ApiProperty, OmitType } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsBoolean, IsInt } from 'class-validator';
import { AnswerEntity } from 'src/modules/answer/entities/answer.entity';
import { QuestionEntity } from 'src/modules/question/entities/question.entity';
import { UserEntity } from 'src/modules/user/entities/user.entity';
import { CreateUserAnswerDto } from 'src/modules/user_answer/dto/create-user-answer.dto';

export class GetUserAnswerDto extends OmitType(CreateUserAnswerDto, [
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
  @Type(() => AnswerEntity)
  answer: AnswerEntity;

  @ApiProperty()
  @IsBoolean()
  isCorrect: boolean;
}
