import { Injectable } from '@nestjs/common';
import { Level } from 'src/constants/level';
import { QuestionEntity } from 'src/modules/question/entities/question.entity';
import { BaseRepository } from 'src/modules/shared/repository/base.repository';
import { BaseService } from 'src/modules/shared/services/base.service';
import { UserQuestionHistoryService } from 'src/modules/user_question_history/user_question_history.service';
import { FindManyOptions, In, MoreThan, Not } from 'typeorm';

@Injectable()
export class QuestionService extends BaseService<QuestionEntity> {
  constructor(
    private readonly _baseRepository: BaseRepository<QuestionEntity>,
    private readonly _userQuestionHistoryService: UserQuestionHistoryService,
  ) {
    super(_baseRepository);
  }

  async findAll(
    options?: FindManyOptions<QuestionEntity>,
    skip?: number,
    take?: number,
  ): Promise<QuestionEntity[]> {
    const customOptions: FindManyOptions<QuestionEntity> = {
      select: ['id', 'text'],
    };

    return this.find(customOptions, skip, take);
  }

  async findForUserBySubcategoryAndLevel(
    userId: number,
    subcategoryId: number,
    level: Level,
  ): Promise<Partial<QuestionEntity>[]> {
    const seenQuestions = await this._userQuestionHistoryService.find({
      relations: ['question'],
      select: ['question', 'level', 'user'],
      where: {
        user: { id: userId },
        level,
        createdAt: MoreThan(new Date(Date.now() - 15 * 24 * 60 * 60 * 1000)), // Last 15 days
      },
    });

    const seenQuestionIds = seenQuestions.map((element) => element.question.id);

    const questions = await this.find(
      {
        relations: ['answerOptions', 'correctAnswer'],
        select: ['id', 'text', 'answerOptions', 'correctAnswer'],
        where: {
          level,
          subcategory: { id: subcategoryId },
          id: Not(In(seenQuestionIds.length ? seenQuestionIds : [0])),
        },
      },
      0,
      3,
    );

    if (questions.length === 0) {
      await this._userQuestionHistoryService.deleteBy({ user: { id: userId }, level });

      const allQuestions = await this.find(
        {
          relations: ['answerOptions', 'correctAnswer'],
          select: ['id', 'text', 'answerOptions', 'correctAnswer'],
          where: { level, subcategory: { id: subcategoryId } },
        },
        0,
        3,
      );

      return allQuestions.sort(() => Math.random() - 0.5);
    }

    const historyEntries = questions.map((question: QuestionEntity) => ({
      user: { id: userId },
      question: { id: question.id },
      level,
    }));

    historyEntries.forEach(
      async (element) => await this._userQuestionHistoryService.create(element),
    );

    return questions.sort(() => Math.random() - 0.5);
  }
}
