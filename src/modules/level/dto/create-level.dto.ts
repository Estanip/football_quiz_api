import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsEnum } from 'class-validator';
import { Level } from 'src/constants/level';

export class CreateLevelDto {
  @ApiProperty({
    description: 'The name of the level',
    enum: Level,
    example: Level.MEDIUM,
  })
  @IsEnum(Level)
  name: Level;

  @ApiProperty({
    description: 'Indicates if the level is active',
    default: true,
    required: false,
  })
  @IsBoolean()
  isActive?: boolean = true;
}
