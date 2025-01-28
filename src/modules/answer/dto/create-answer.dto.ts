import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsArray, IsBoolean, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { CategoryEntity } from 'src/modules/category/entities/category.entity';
import { QuestionEntity } from 'src/modules/question/entities/question.entity';
import { SubcategoryEntity } from 'src/modules/subcategory/entities/subcategory.entity';

export class CreateAnswerDto {
  @ApiProperty({
    description: 'The text of the answer',
    example: 'This is an example answer',
  })
  @IsString()
  @IsNotEmpty()
  text: string;

  @ApiProperty({
    description: 'Categories associated with the answer',
    type: [CategoryEntity],
    isArray: true,
  })
  @IsArray()
  @Type(() => CategoryEntity)
  categories: CategoryEntity[];

  @ApiProperty({
    description: 'Subcategories associated with the answer',
    type: [SubcategoryEntity],
    isArray: true,
  })
  @IsArray()
  @Type(() => SubcategoryEntity)
  subcategories: SubcategoryEntity[];

  @ApiProperty({
    description: 'Questions associated with the answer',
    type: [QuestionEntity],
    isArray: true,
  })
  @IsArray()
  @Type(() => QuestionEntity)
  questions: QuestionEntity[];

  @ApiProperty({
    description: 'Indicates if the answer is active',
    default: true,
  })
  @IsOptional()
  @IsBoolean()
  isActive?: boolean = true;
}
