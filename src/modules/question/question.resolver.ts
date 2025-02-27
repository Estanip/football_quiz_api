import { Args, Context, Query, Resolver } from '@nestjs/graphql';
import { Level } from 'src/constants/level';

import { QuestionEntity } from './entities/question.entity';
import { QuestionService } from './question.service';

@Resolver(() => QuestionEntity)
export class QuestionResolver {
  constructor(private readonly _questionService: QuestionService) {}

  @Query(() => [QuestionEntity], { name: 'getQuestionsBySubcategoryAndLevel' })
  async getQuestionsBySubcategoryAndLevel(
    @Args('subcategory', { type: () => Number }) subcategory: number,
    @Args('level', { type: () => Level }) level: Level,
    @Context() context,
  ): Promise<Partial<QuestionEntity>[]> {
    const userId = context.req.user.id;
    return this._questionService.findForUserBySubcategoryAndLevel(userId, subcategory, level);
  }
}
