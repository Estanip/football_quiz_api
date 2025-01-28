import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsEnum, IsInt, IsNotEmpty, IsOptional, Length, Matches } from 'class-validator';
import { Role } from 'src/constants/role';
import { REGEXP } from 'src/constants/validators';

export class CreateUserDto {
  @ApiProperty({ description: 'User email', example: 'user@example.com' })
  @Matches(REGEXP.email, {
    message: 'Email must be a valid email address',
  })
  @IsNotEmpty()
  @Length(5, 30)
  email: string;

  @ApiProperty({ description: 'User password', example: 'password123' })
  @Matches(REGEXP.password, {
    message:
      'Pass must have at least one uppercase letter, one lowercase, a number and a character',
  })
  @IsNotEmpty()
  password: string;

  @ApiProperty({ description: 'User role', enum: Role, example: Role.Admin })
  @IsEnum(Role)
  @IsNotEmpty()
  role: Role;

  @ApiProperty({ description: 'User score', example: 0, required: false })
  @IsOptional()
  @IsInt()
  score?: number = 0;

  @ApiProperty({
    description: 'User status (active/inactive)',
    default: true,
    required: false,
  })
  @IsOptional()
  @IsBoolean()
  isActive?: boolean = true;
}
