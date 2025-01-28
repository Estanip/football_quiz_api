import { Injectable } from '@nestjs/common';
import { LevelEntity } from 'src/modules/level/entities/level.entity';
import { BaseRepository } from 'src/modules/shared/repository/base-repository';
import { BaseService } from 'src/modules/shared/services/base-service';

@Injectable()
export class LevelService extends BaseService<LevelEntity> {
  constructor(private readonly _repository: BaseRepository<LevelEntity>) {
    super(_repository);
  }

  async findAll(): Promise<Partial<LevelEntity>[]> {
    return await this.find({
      select: ['name'],
    });
  }
}
