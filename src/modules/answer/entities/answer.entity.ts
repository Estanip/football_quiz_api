import { Field, ObjectType } from '@nestjs/graphql';
import { Exclude } from 'class-transformer';
import { CategoryEntity } from 'src/modules/category/entities/category.entity';
import { QuestionEntity } from 'src/modules/question/entities/question.entity';
import { TypeOrmEntity } from 'src/modules/shared/entities/base.entity';
import { SubcategoryEntity } from 'src/modules/subcategory/entities/subcategory.entity';
import { Column, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne } from 'typeorm';

@Entity({ name: 'answer' })
@ObjectType({ description: 'answer' })
export class AnswerEntity extends TypeOrmEntity {
  @Column({ type: 'varchar' })
  @Field()
  text: string;

  @ManyToMany(() => CategoryEntity, (category) => category.answers)
  @JoinTable({
    name: 'answer_category',
    joinColumn: {
      name: 'answer_id',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'category_id',
      referencedColumnName: 'id',
    },
  })
  @Field(() => [CategoryEntity])
  categories: CategoryEntity[];

  @ManyToMany(() => SubcategoryEntity, (subcategory) => subcategory.answers)
  @JoinTable({
    name: 'answer_subcategory',
    joinColumn: {
      name: 'answer_id',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'subcategory_id',
      referencedColumnName: 'id',
    },
  })
  @Field(() => [SubcategoryEntity])
  subcategories: SubcategoryEntity[];

  @ManyToOne(() => QuestionEntity, (question) => question.answerOptions, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'question_id' })
  @Field(() => [QuestionEntity])
  question: QuestionEntity;

  @Column({ type: 'boolean', default: true, name: 'is_active', select: false })
  @Field()
  @Exclude({ toPlainOnly: true })
  isActive?: boolean;
}
