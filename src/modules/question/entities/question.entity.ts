import { Field } from '@nestjs/graphql';
import { Level } from 'src/constants/level';
import { AnswerEntity } from 'src/modules/answer/entities/answer.entity';
import { CategoryEntity } from 'src/modules/category/entities/category.entity';
import { TypeOrmEntity } from 'src/modules/shared/entities/base-entity';
import { SubcategoryEntity } from 'src/modules/subcategory/entities/subcategory.entity';
import { UserAnswerEntity } from 'src/modules/user_answer/entities/user_answer.entity';
import { Column, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, OneToMany } from 'typeorm';

@Entity({ name: 'question' })
export class QuestionEntity extends TypeOrmEntity {
  @Column({ type: 'varchar', unique: true })
  @Field()
  text: string;

  @ManyToMany(() => AnswerEntity, (answerOption) => answerOption.questions, {
    cascade: true,
    eager: true,
  })
  @JoinTable({ name: 'question_answer_options' })
  @Field(() => [AnswerEntity])
  answerOptions: AnswerEntity[];

  @ManyToOne(() => AnswerEntity, { nullable: true, eager: true })
  @JoinColumn({ name: 'correct_answer_id' })
  @Field(() => AnswerEntity, { nullable: true })
  correctAnswer: AnswerEntity;

  @ManyToOne(() => CategoryEntity, (category) => category.questions, { eager: true })
  @JoinColumn({ name: 'category_id' })
  @Field(() => CategoryEntity)
  category: CategoryEntity;

  @ManyToOne(() => SubcategoryEntity, (subcategory) => subcategory.questions, { eager: true })
  @JoinColumn({ name: 'subcategory_id' })
  @Field(() => SubcategoryEntity)
  subcategory: SubcategoryEntity;

  @Column({ type: 'enum', enum: Level })
  @Field()
  level: Level;

  @OneToMany(() => UserAnswerEntity, (userAnswer) => userAnswer.question)
  userAnswers: UserAnswerEntity[];

  @Column({ type: 'boolean', default: true, name: 'is_active' })
  @Field()
  isActive?: boolean;
}
