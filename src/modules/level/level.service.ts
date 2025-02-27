import { Injectable } from '@nestjs/common';
import { LevelEntity } from 'src/modules/level/entities/level.entity';
import { BaseRepository } from 'src/modules/shared/repository/base.repository';
import { BaseService } from 'src/modules/shared/services/base.service';
import { FindManyOptions } from 'typeorm';

@Injectable()
export class LevelService extends BaseService<LevelEntity> {
  constructor(private readonly _repository: BaseRepository<LevelEntity>) {
    super(_repository);
  }

  async findAll(
    options?: FindManyOptions<LevelEntity>,
    skip?: number,
    take?: number,
  ): Promise<LevelEntity[]> {
    const customOptions: FindManyOptions<LevelEntity> = {
      select: ['name'],
    };

    return this.find(customOptions, skip, take);
  }
}
