import { Injectable } from '@nestjs/common';
import { QuestionService } from 'src/modules/question/question.service';
import { BaseRepository } from 'src/modules/shared/repository/base-repository';
import { BaseService } from 'src/modules/shared/services/base-service';
import { CreateUserAnswerDto } from 'src/modules/user_answer/dto/create-user-answer.dto';
import { UserAnswerEntity } from 'src/modules/user_answer/entities/user_answer.entity';

@Injectable()
export class UserAnswerService extends BaseService<UserAnswerEntity> {
  constructor(
    private readonly _repository: BaseRepository<UserAnswerEntity>,
    private readonly _questionService: QuestionService,
  ) {
    super(_repository);
  }

  async findAll(): Promise<Partial<UserAnswerEntity>[]> {
    return await this.find({
      relations: ['question', 'answer', 'user'],
      select: ['id', 'answer', 'question', 'isCorrect', 'user', 'answeredAt'],
    });
  }

  async createAnswer(createDto: CreateUserAnswerDto): Promise<UserAnswerEntity> {
    const question = await this._questionService.findById(createDto.question);
    const correctAnswerId = question.correctAnswer.id;
    const isCorrect = correctAnswerId === createDto.answer;

    createDto = { ...createDto, isCorrect };

    return await this.create(createDto);
  }
}
