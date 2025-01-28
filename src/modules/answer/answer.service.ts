import { Injectable } from '@nestjs/common';
import { AnswerEntity } from 'src/modules/answer/entities/answer.entity';
import { BaseRepository } from 'src/modules/shared/repository/base-repository';
import { BaseService } from 'src/modules/shared/services/base-service';

@Injectable()
export class AnswerService extends BaseService<AnswerEntity> {
  constructor(private readonly _repository: BaseRepository<AnswerEntity>) {
    super(_repository);
  }

  async findAll(): Promise<Partial<AnswerEntity>[]> {
    return await this._repository.find({
      select: ['id', 'text', 'questions', 'categories', 'subcategories'],
    });
  }
}
