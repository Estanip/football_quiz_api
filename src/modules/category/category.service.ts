import { Injectable } from '@nestjs/common';
import { CategoryEntity } from 'src/modules/category/entities/category.entity';
import { BaseRepository } from 'src/modules/shared/repository/base.repository';
import { BaseService } from 'src/modules/shared/services/base.service';
import { FindManyOptions } from 'typeorm';

@Injectable()
export class CategoryService extends BaseService<CategoryEntity> {
  constructor(private readonly _repository: BaseRepository<CategoryEntity>) {
    super(_repository);
  }

  async findAll(
    options?: FindManyOptions<CategoryEntity>,
    skip?: number,
    take?: number,
  ): Promise<CategoryEntity[]> {
    const customOptions: FindManyOptions<CategoryEntity> = {
      select: ['id', 'name', 'subcategories'],
    };

    return this.find(customOptions, skip, take);
  }
}
