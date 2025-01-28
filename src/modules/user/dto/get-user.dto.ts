import { ApiProperty, OmitType } from '@nestjs/swagger';
import { IsInt } from 'class-validator';
import { CreateUserDto } from 'src/modules/user/dto/create-user.dto';

export class GetUserDto extends OmitType(CreateUserDto, ['password', 'isActive'] as const) {
  @ApiProperty()
  @IsInt()
  id: number;
}
