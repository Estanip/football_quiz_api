import { Field, Int } from '@nestjs/graphql';
import { Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class TypeOrmEntity {
  @PrimaryGeneratedColumn()
  @Field(() => Int)
  id: number;
}
