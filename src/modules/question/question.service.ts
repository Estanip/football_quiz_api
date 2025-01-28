import { Injectable } from '@nestjs/common';
import { QuestionEntity } from 'src/modules/question/entities/question.entity';
import { BaseRepository } from 'src/modules/shared/repository/base-repository';
import { BaseService } from 'src/modules/shared/services/base-service';

@Injectable()
export class QuestionService extends BaseService<QuestionEntity> {
  constructor(private readonly _repository: BaseRepository<QuestionEntity>) {
    super(_repository);
  }

  async findAll(): Promise<Partial<QuestionEntity>[]> {
    return await this.find({
      select: ['id', 'text', 'answerOptions', 'correctAnswer', 'category', 'subcategory', 'level'],
    });
  }
}
