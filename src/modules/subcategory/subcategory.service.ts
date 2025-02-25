import { Injectable } from '@nestjs/common';
import { BaseRepository } from 'src/modules/shared/repository/base.repository';
import { BaseService } from 'src/modules/shared/services/base.service';
import { SubcategoryEntity } from 'src/modules/subcategory/entities/subcategory.entity';
import { FindManyOptions } from 'typeorm';

@Injectable()
export class SubcategoryService extends BaseService<SubcategoryEntity> {
  constructor(private readonly _repository: BaseRepository<SubcategoryEntity>) {
    super(_repository);
  }

  async findAll(
    options?: FindManyOptions<SubcategoryEntity>,
    skip?: number,
    take?: number,
  ): Promise<SubcategoryEntity[]> {
    const customOptions: FindManyOptions<SubcategoryEntity> = {
      select: ['id', 'name', 'categories'],
    };

    return this.find(customOptions, skip, take);
  }
}
