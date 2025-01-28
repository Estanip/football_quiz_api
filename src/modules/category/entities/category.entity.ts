import { Field } from '@nestjs/graphql';
import { AnswerEntity } from 'src/modules/answer/entities/answer.entity';
import { QuestionEntity } from 'src/modules/question/entities/question.entity';
import { TypeOrmEntity } from 'src/modules/shared/entities/base-entity';
import { SubcategoryEntity } from 'src/modules/subcategory/entities/subcategory.entity';
import { Column, Entity, ManyToMany, OneToMany } from 'typeorm';

@Entity({ name: 'category' })
export class CategoryEntity extends TypeOrmEntity {
  @Column()
  @Field()
  name: string;

  @ManyToMany(() => SubcategoryEntity, (subcategory) => subcategory.categories)
  @Field(() => [SubcategoryEntity])
  subcategories: SubcategoryEntity[];

  @OneToMany(() => QuestionEntity, (question) => question.category)
  @Field(() => [QuestionEntity])
  questions: QuestionEntity[];

  @ManyToMany(() => AnswerEntity, (answer) => answer.categories)
  @Field(() => [AnswerEntity])
  answers: AnswerEntity[];

  @Column({ type: 'boolean', default: true, name: 'is_active' })
  @Field()
  isActive?: boolean;
}
