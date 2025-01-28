import { ApiProperty, OmitType } from '@nestjs/swagger';
import { IsInt } from 'class-validator';
import { CreateSubcategoryDto } from 'src/modules/subcategory/dto/create-subcategory.dto';

export class GetSubcategoryDto extends OmitType(CreateSubcategoryDto, ['isActive'] as const) {
  @ApiProperty()
  @IsInt()
  id: number;
}
