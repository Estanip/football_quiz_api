import { Field, Int, ObjectType } from '@nestjs/graphql';
import { AnswerEntity } from 'src/modules/answer/entities/answer.entity';
import { QuestionEntity } from 'src/modules/question/entities/question.entity';
import { TypeOrmEntity } from 'src/modules/shared/entities/base-entity';
import { UserEntity } from 'src/modules/user/entities/user.entity';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';

@Entity({ name: 'user_answers' })
@ObjectType()
export class UserAnswerEntity extends TypeOrmEntity {
  @ManyToOne(() => UserEntity, (user) => user.answers, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'user_id' })
  @Field(() => Int)
  user: number;
  /*   @Field(() => UserEntity)
  user: UserEntity; */

  @ManyToOne(() => QuestionEntity, (question) => question.userAnswers, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'question_id' })
  @Field(() => Int)
  question: number;
  /*   @Field(() => QuestionEntity)
  question: QuestionEntity; */

  @ManyToOne(() => AnswerEntity, { onDelete: 'SET NULL' })
  @JoinColumn({ name: 'answer_id' })
  @Field(() => Int)
  answer: number;
  /*   @Field(() => AnswerEntity)
  answer: AnswerEntity; */

  @Column({ type: 'boolean' })
  @Field()
  isCorrect: boolean;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', name: 'answered_at' })
  @Field()
  answeredAt: Date;

  @Column({ type: 'boolean', default: true, name: 'is_active' })
  @Field()
  isActive?: boolean;
}
