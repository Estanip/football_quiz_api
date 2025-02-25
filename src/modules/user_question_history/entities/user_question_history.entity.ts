import { Field, ObjectType } from '@nestjs/graphql';
import { Exclude } from 'class-transformer';
import { Level } from 'src/constants/level';
import { QuestionEntity } from 'src/modules/question/entities/question.entity';
import { TypeOrmEntity } from 'src/modules/shared/entities/base.entity';
import { UserEntity } from 'src/modules/user/entities/user.entity';
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne } from 'typeorm';

@Entity({ name: 'user_questions_history' })
@ObjectType({ description: 'user_questions_history' })
export class UserQuestionHistoryEntity extends TypeOrmEntity {
  @ManyToOne(() => UserEntity, (user) => user.answers, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'user_id' })
  @Field(() => UserEntity)
  user: UserEntity;

  @ManyToOne(() => QuestionEntity, (question) => question.userAnswers, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'question_id' })
  @Field(() => QuestionEntity)
  question: QuestionEntity;

  @Column({ enum: Level })
  @Field()
  level: Level;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', name: 'answered_at' })
  @Field()
  @CreateDateColumn()
  createdAt?: Date;

  @Column({ type: 'boolean', default: true, name: 'is_active', select: false })
  @Field()
  @Exclude({ toPlainOnly: true })
  isActive?: boolean;
}
