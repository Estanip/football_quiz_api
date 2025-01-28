import { Field, ObjectType } from '@nestjs/graphql';
import { Level } from 'src/constants/level';
import { TypeOrmEntity } from 'src/modules/shared/entities/base-entity';
import { Column, Entity } from 'typeorm';

@Entity({ name: 'level' })
@ObjectType({ description: 'level' })
export class LevelEntity extends TypeOrmEntity {
  @Column({ type: 'enum', enum: Level, unique: true })
  @Field(() => Level)
  name: Level;

  @Column({ type: 'boolean', default: true, name: 'is_active' })
  @Field()
  isActive: boolean;
}
