import { ApiProperty, OmitType } from '@nestjs/swagger';
import { IsInt } from 'class-validator';
import { CreateQuestionDto } from 'src/modules/question/dto/create-question.dto';

export class GetQuestionDto extends OmitType(CreateQuestionDto, ['isActive'] as const) {
  @ApiProperty()
  @IsInt()
  id: number;
}
