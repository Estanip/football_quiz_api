import { Field, Int, ObjectType } from '@nestjs/graphql';
import { TypeOrmEntity } from 'src/modules/shared/entities/base.entity';
import { UserEntity } from 'src/modules/user/entities/user.entity';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';

@Entity({ name: 'score_history' })
@ObjectType({ description: 'Score History' })
export class ScoreHistoryEntity extends TypeOrmEntity {
  @ManyToOne(() => UserEntity, (user) => user.scoreHistory, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'user_id' })
  @Field(() => UserEntity)
  user: UserEntity;

  @Column({ type: 'int' })
  @Field(() => Int)
  change: number;

  @Column({ type: 'varchar', length: 255, nullable: true })
  @Field({ nullable: true })
  reason: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  @Field()
  changedAt: Date;
}
