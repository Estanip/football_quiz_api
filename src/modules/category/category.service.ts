import { Injectable } from '@nestjs/common';
import { CategoryEntity } from 'src/modules/category/entities/category.entity';
import { BaseRepository } from 'src/modules/shared/repository/base-repository';
import { BaseService } from 'src/modules/shared/services/base-service';

@Injectable()
export class CategoryService extends BaseService<CategoryEntity> {
  constructor(private readonly _repository: BaseRepository<CategoryEntity>) {
    super(_repository);
  }

  async findAll(): Promise<Partial<CategoryEntity>[]> {
    return await this.find({
      select: ['id', 'name', 'subcategories'],
    });
  }
}
