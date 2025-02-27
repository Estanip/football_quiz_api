import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsNotEmpty, IsOptional } from 'class-validator';

export class CreateUserQuestionHistoryDto {
  @ApiProperty()
  @IsNotEmpty()
  user: number;

  @ApiProperty()
  @IsNotEmpty()
  question: number;

  @ApiProperty()
  @IsNotEmpty()
  answer: number;

  @ApiProperty({ description: 'Date when user response question' })
  answeredAt: Date;

  @ApiProperty({
    description: 'Is the correct answer?',
  })
  @IsBoolean()
  @IsOptional()
  isCorrect?: boolean;

  @ApiProperty({
    description: 'User answer status (active/inactive)',
    default: true,
    required: false,
  })
  @IsOptional()
  @IsBoolean()
  isActive?: boolean = true;
}
