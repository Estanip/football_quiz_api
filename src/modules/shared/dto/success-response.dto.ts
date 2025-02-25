import { Field, Int, ObjectType } from '@nestjs/graphql';
import { ApiProperty } from '@nestjs/swagger';

@ObjectType({ description: 'Success response' })
export class SuccessResponseDto<T = any> {
  @ApiProperty({ example: true })
  @Field(() => Boolean)
  success: boolean;

  @ApiProperty({ example: 200 })
  @Field(() => Int)
  statusCode: number;

  @ApiProperty({ example: 'Operation completed successfully' })
  @Field(() => String)
  message: string;

  @ApiProperty({ example: {} })
  @Field(() => [], { nullable: true })
  data: T;

  constructor(success: boolean, statusCode: number, message: string, data: T = {} as T) {
    this.success = success;
    this.statusCode = statusCode;
    this.message = message;
    this.data = data;
  }
}
