import { ApiProperty, OmitType } from '@nestjs/swagger';
import { IsInt } from 'class-validator';
import { CreateAnswerDto } from 'src/modules/answer/dto/create-answer.dto';

export class GetAnswerDto extends OmitType(CreateAnswerDto, ['isActive'] as const) {
  @ApiProperty()
  @IsInt()
  id: number;
}
