import { Injectable } from '@nestjs/common';
import { BaseRepository } from 'src/modules/shared/repository/base-repository';
import { BaseService } from 'src/modules/shared/services/base-service';
import { SubcategoryEntity } from 'src/modules/subcategory/entities/subcategory.entity';

@Injectable()
export class SubcategoryService extends BaseService<SubcategoryEntity> {
  constructor(private readonly _repository: BaseRepository<SubcategoryEntity>) {
    super(_repository);
  }

  async findAll(): Promise<Partial<SubcategoryEntity>[]> {
    return await this.find({
      select: ['id', 'name', 'categories'],
    });
  }
}
