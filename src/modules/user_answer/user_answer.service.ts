import { Injectable } from '@nestjs/common';
import { QuestionService } from 'src/modules/question/question.service';
import { BaseRepository } from 'src/modules/shared/repository/base.repository';
import { BaseService } from 'src/modules/shared/services/base.service';
import { CreateUserAnswerDto } from 'src/modules/user_answer/dto/create-user-answer.dto';
import { UserAnswerEntity } from 'src/modules/user_answer/entities/user_answer.entity';
import { FindManyOptions } from 'typeorm';

@Injectable()
export class UserAnswerService extends BaseService<UserAnswerEntity> {
  constructor(
    private readonly _repository: BaseRepository<UserAnswerEntity>,
    private readonly _questionService: QuestionService,
  ) {
    super(_repository);
  }

  async findAll(
    options?: FindManyOptions<UserAnswerEntity>,
    skip?: number,
    take?: number,
  ): Promise<UserAnswerEntity[]> {
    const customOptions: FindManyOptions<UserAnswerEntity> = {
      select: ['id', 'answer', 'question', 'isCorrect', 'user', 'answeredAt'],
    };

    return this.find(customOptions, skip, take);
  }

  async createAnswer(createDto: CreateUserAnswerDto): Promise<UserAnswerEntity> {
    const question = await this._questionService.findById(createDto.question, {
      relations: ['correctAnswer'],
    });
    const correctAnswerId = question.correctAnswer.id;
    const isCorrect = correctAnswerId === createDto.answer;

    return await this.create({
      user: { id: createDto.user },
      question: { id: createDto.question },
      answer: { id: createDto.answer },
      isCorrect,
    });
  }
}
