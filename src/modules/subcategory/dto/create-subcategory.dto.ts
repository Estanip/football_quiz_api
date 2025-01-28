import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsOptional, IsString } from 'class-validator';

export class CreateSubcategoryDto {
  @ApiProperty({
    description: 'The name of the subcategory',
    example: 'Physics',
  })
  @IsString()
  name: string;

  @ApiProperty({
    description: 'Indicates if the subcategory is active',
    default: true,
    required: false,
  })
  @IsBoolean()
  @IsOptional()
  isActive?: boolean = true;
}
