import { ApiProperty } from '@nestjs/swagger';
import {
  ArrayNotEmpty,
  IsArray,
  IsBoolean,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';
import { Level } from 'src/constants/level';
import { AnswerEntity } from 'src/modules/answer/entities/answer.entity';
import { CategoryEntity } from 'src/modules/category/entities/category.entity';
import { SubcategoryEntity } from 'src/modules/subcategory/entities/subcategory.entity';

export class CreateQuestionDto {
  @ApiProperty({
    description: 'The text content of the question',
    example: 'What is the capital of France?',
  })
  @IsString()
  @IsNotEmpty()
  text: string;

  @ApiProperty({
    description: 'List of possible answers for the question',
    type: [AnswerEntity],
    example: [1, 2],
  })
  @IsArray()
  @ArrayNotEmpty()
  answerOptions: AnswerEntity[];

  @ApiProperty({
    description: 'The correct answer for the question',
    type: AnswerEntity,
    example: 1,
    required: false,
  })
  @IsOptional()
  correctAnswer: AnswerEntity;

  @ApiProperty({
    description: 'The category the question belongs to',
    type: CategoryEntity,
    example: 1,
  })
  @IsNotEmpty()
  category: CategoryEntity;

  @ApiProperty({
    description: 'The subcategory the question belongs to',
    type: SubcategoryEntity,
    example: 1,
  })
  @IsNotEmpty()
  subcategory: SubcategoryEntity;

  @ApiProperty({
    description: 'The difficulty level of the question',
    enum: Level,
    example: Level.MEDIUM,
  })
  @IsEnum(Level)
  level: Level;

  @ApiProperty({
    description: 'Indicates if the question is active',
    default: true,
    required: false,
  })
  @IsOptional()
  @IsBoolean()
  isActive?: boolean = true;
}
