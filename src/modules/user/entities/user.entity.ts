import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Role } from 'src/constants/role';
import { ScoreHistoryEntity } from 'src/modules/score/entities/score_history.entity';
import { TypeOrmEntity } from 'src/modules/shared/entities/base-entity';
import { UserAnswerEntity } from 'src/modules/user_answer/entities/user_answer.entity';
import { Column, Entity, OneToMany } from 'typeorm';

@Entity({ name: 'users' })
@ObjectType({ description: 'users' })
export class UserEntity extends TypeOrmEntity {
  @Column({ type: 'varchar', length: 30, unique: true })
  @Field()
  email: string;

  @Column({ type: 'varchar' })
  @Field()
  password: string;

  @Column({ type: 'enum', enum: Role })
  @Field(() => Role)
  role: Role;

  @Column({ type: 'int', default: 0 })
  @Field(() => Int)
  score: number;

  @OneToMany(() => ScoreHistoryEntity, (history) => history.user)
  @Field(() => [ScoreHistoryEntity])
  scoreHistory: ScoreHistoryEntity[];

  @OneToMany(() => UserAnswerEntity, (userAnswer) => userAnswer.user)
  answers: UserAnswerEntity[];

  @Column({ type: 'boolean', default: true, name: 'is_active' })
  @Field()
  isActive?: boolean;
}
