import { Field, ObjectType } from '@nestjs/graphql';
import { Exclude } from 'class-transformer';
import { Level } from 'src/constants/level';
import { AnswerEntity } from 'src/modules/answer/entities/answer.entity';
import { CategoryEntity } from 'src/modules/category/entities/category.entity';
import { TypeOrmEntity } from 'src/modules/shared/entities/base.entity';
import { SubcategoryEntity } from 'src/modules/subcategory/entities/subcategory.entity';
import { UserAnswerEntity } from 'src/modules/user_answer/entities/user_answer.entity';
import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';

@Entity({ name: 'question' })
@ObjectType()
export class QuestionEntity extends TypeOrmEntity {
  @Column({ type: 'varchar', unique: true })
  @Field()
  text: string;

  @OneToMany(() => AnswerEntity, (answerOption) => answerOption.question, {
    cascade: true,
  })
  @Field(() => [AnswerEntity])
  answerOptions: AnswerEntity[];

  @ManyToOne(() => AnswerEntity, { nullable: true })
  @JoinColumn({ name: 'correct_answer_id' })
  @Field(() => AnswerEntity, { nullable: true })
  correctAnswer: AnswerEntity;

  @ManyToOne(() => CategoryEntity, (category) => category.questions)
  @JoinColumn({ name: 'category_id' })
  @Field(() => CategoryEntity)
  category: CategoryEntity;

  @ManyToOne(() => SubcategoryEntity, (subcategory) => subcategory.questions)
  @JoinColumn({ name: 'subcategory_id' })
  @Field(() => SubcategoryEntity)
  subcategory: SubcategoryEntity;

  @Column({ type: 'enum', enum: Level })
  @Field()
  level: Level;

  @OneToMany(() => UserAnswerEntity, (userAnswer) => userAnswer.question)
  userAnswers: UserAnswerEntity[];

  @Column({ type: 'boolean', default: true, name: 'is_active', select: false })
  @Field()
  @Exclude({ toPlainOnly: true })
  isActive?: boolean;
}
