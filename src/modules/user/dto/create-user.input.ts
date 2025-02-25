import { Field, InputType } from '@nestjs/graphql';
import { ApiProperty } from '@nestjs/swagger';
import {
  IsBoolean,
  IsEnum,
  IsInt,
  IsNotEmpty,
  IsOptional,
  Length,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';
import { Role } from 'src/constants/role';
import { REGEXP } from 'src/constants/validators';

@InputType()
export class CreateUserInput {
  @Field()
  @ApiProperty({ description: 'User email', example: 'user@example.com' })
  @Matches(REGEXP.email, {
    message: 'Email must be a valid email address',
  })
  @MaxLength(50)
  @IsNotEmpty()
  @Length(5, 30)
  email: string;

  @Field()
  @ApiProperty({ description: 'User password', example: 'password123' })
  @Matches(REGEXP.password, {
    message:
      'Pass must have at least one uppercase letter, one lowercase, a number and a character, mix 8 characters max 20',
  })
  @MinLength(8)
  @MaxLength(20)
  @IsNotEmpty()
  password: string;

  @Field(() => Role)
  @ApiProperty({ description: 'User role', default: Role.Player, enum: Role, example: Role.Admin })
  @IsEnum(Role)
  @IsNotEmpty()
  role?: Role = Role.Player;

  @Field({ nullable: true })
  @ApiProperty({
    description: 'User score',
    required: false,
  })
  @IsOptional()
  @IsInt()
  score?: number = 0;

  @Field({ nullable: true })
  @ApiProperty({
    description: 'User status (active/inactive)',
    default: true,
    required: false,
  })
  @IsOptional()
  @IsBoolean()
  isActive?: boolean = true;
}
