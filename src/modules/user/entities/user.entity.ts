import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Exclude } from 'class-transformer';
import { Role } from 'src/constants/role';
import { ScoreHistoryEntity } from 'src/modules/score/entities/score_history.entity';
import { TypeOrmEntity } from 'src/modules/shared/entities/base.entity';
import { UserAnswerEntity } from 'src/modules/user_answer/entities/user_answer.entity';
import { Column, Entity, OneToMany } from 'typeorm';

@Entity({ name: 'users' })
@ObjectType({ description: 'users' })
export class UserEntity extends TypeOrmEntity {
  @Column({ type: 'varchar', length: 30, unique: true })
  @Field()
  email: string;

  @Column({ type: 'varchar' })
  @Exclude({ toPlainOnly: true })
  @Field()
  password: string;

  @Column({ type: 'varchar' })
  @Exclude({ toPlainOnly: true })
  @Field()
  username?: string;

  @Column({ type: 'varchar', nullable: true, default: null })
  @Exclude({ toPlainOnly: true })
  @Field({ nullable: true })
  fav_team?: string | null = null;

  @Column({ type: 'enum', enum: Role, default: Role.Player })
  @Field(() => Role)
  role?: Role = Role.Player;

  @Column({ type: 'int', default: 0 })
  @Field(() => Int)
  score: number;

  @OneToMany(() => ScoreHistoryEntity, (history) => history.user)
  @Field(() => [ScoreHistoryEntity])
  scoreHistory: ScoreHistoryEntity[];

  @OneToMany(() => UserAnswerEntity, (userAnswer) => userAnswer.user)
  answers: UserAnswerEntity[];

  @Column({ type: 'boolean', default: true, name: 'is_active', select: false })
  @Field()
  @Exclude({ toPlainOnly: true })
  isActive?: boolean;
}
