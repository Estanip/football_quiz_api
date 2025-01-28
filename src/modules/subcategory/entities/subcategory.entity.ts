import { Field } from '@nestjs/graphql';
import { AnswerEntity } from 'src/modules/answer/entities/answer.entity';
import { CategoryEntity } from 'src/modules/category/entities/category.entity';
import { QuestionEntity } from 'src/modules/question/entities/question.entity';
import { TypeOrmEntity } from 'src/modules/shared/entities/base-entity';
import { Column, Entity, ManyToMany, OneToMany } from 'typeorm';

@Entity({ name: 'subcategory' })
export class SubcategoryEntity extends TypeOrmEntity {
  @Column()
  @Field()
  name: string;

  @ManyToMany(() => CategoryEntity, (category) => category.subcategories)
  @Field(() => [CategoryEntity])
  categories: CategoryEntity[];

  @OneToMany(() => QuestionEntity, (question) => question.subcategory)
  @Field(() => [QuestionEntity])
  questions: QuestionEntity[];

  @ManyToMany(() => AnswerEntity, (answer) => answer.categories)
  @Field(() => [AnswerEntity])
  answers: AnswerEntity[];

  @Column({ type: 'boolean', default: true, name: 'is_active' })
  @Field()
  isActive?: boolean;
}
