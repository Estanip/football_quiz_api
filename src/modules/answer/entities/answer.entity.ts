import { Field } from '@nestjs/graphql';
import { CategoryEntity } from 'src/modules/category/entities/category.entity';
import { QuestionEntity } from 'src/modules/question/entities/question.entity';
import { TypeOrmEntity } from 'src/modules/shared/entities/base-entity';
import { SubcategoryEntity } from 'src/modules/subcategory/entities/subcategory.entity';
import { Column, Entity, JoinTable, ManyToMany } from 'typeorm';

@Entity({ name: 'answer' })
export class AnswerEntity extends TypeOrmEntity {
  @Column({ type: 'varchar', unique: true })
  @Field()
  text: string;

  @ManyToMany(() => CategoryEntity, (category) => category.answers)
  @JoinTable({ name: 'answer_category' })
  @Field(() => [CategoryEntity])
  categories: CategoryEntity[];

  @ManyToMany(() => SubcategoryEntity, (subcategory) => subcategory.answers)
  @JoinTable({ name: 'answer_subcategory' })
  @Field(() => [SubcategoryEntity])
  subcategories: SubcategoryEntity[];

  @ManyToMany(() => QuestionEntity, (question) => question.answerOptions)
  @Field(() => [QuestionEntity])
  questions: QuestionEntity[];

  @Column({ type: 'boolean', default: true, name: 'is_active' })
  @Field()
  isActive?: boolean;
}
