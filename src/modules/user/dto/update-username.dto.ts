import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, Matches, MaxLength, MinLength } from 'class-validator';
import { REGEXP } from 'src/constants/validators';

export class UpdateUserUsernameDto {
  @ApiProperty({ description: 'Username', example: 'estani_1877' })
  @Matches(REGEXP.username, {
    message: 'Username only allow letters, numbers or special characters like "-,_,*,!,.")',
  })
  @MinLength(3, { message: 'Min three characters' })
  @MaxLength(20, { message: 'Min twenty characters' })
  @IsNotEmpty()
  username?: string;
}
