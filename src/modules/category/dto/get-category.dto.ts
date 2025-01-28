import { ApiProperty, OmitType } from '@nestjs/swagger';
import { IsInt } from 'class-validator';
import { CreateCategoryDto } from 'src/modules/category/dto/create-category.dto';

export class GetCategoryDto extends OmitType(CreateCategoryDto, ['isActive'] as const) {
  @ApiProperty()
  @IsInt()
  id: number;
}
