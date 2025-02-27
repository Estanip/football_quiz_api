import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsString } from 'class-validator';
import { Role } from 'src/constants/role';

export class SignInDto {
  @ApiProperty()
  @IsString()
  email: string;

  @ApiProperty()
  @IsString()
  password: string;
}

export class SignUpDto extends SignInDto {
  @ApiProperty({ default: Role.Player })
  @IsString()
  @IsEnum(Role)
  role: Role = Role.Player;
}
