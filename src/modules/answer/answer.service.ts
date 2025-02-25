import { Injectable } from '@nestjs/common';
import { AnswerEntity } from 'src/modules/answer/entities/answer.entity';
import { BaseRepository } from 'src/modules/shared/repository/base.repository';
import { BaseService } from 'src/modules/shared/services/base.service';
import { FindManyOptions } from 'typeorm';

@Injectable()
export class AnswerService extends BaseService<AnswerEntity> {
  constructor(private readonly _repository: BaseRepository<AnswerEntity>) {
    super(_repository);
  }

  async findAll(
    options?: FindManyOptions<AnswerEntity>,
    skip?: number,
    take?: number,
  ): Promise<AnswerEntity[]> {
    const customOptions: FindManyOptions<AnswerEntity> = {
      select: ['id', 'text', 'question', 'categories', 'subcategories'],
    };

    return this.find(customOptions, skip, take);
  }
}
