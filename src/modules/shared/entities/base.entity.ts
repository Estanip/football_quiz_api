import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
@ObjectType({ description: 'Typeorm entity' })
export class TypeOrmEntity {
  @PrimaryGeneratedColumn()
  @Field(() => Int)
  id: number;
}
