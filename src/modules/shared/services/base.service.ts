import { BaseRepository } from 'src/modules/shared/repository/base.repository';
import { DeepPartial, FindManyOptions, FindOptionsWhere } from 'typeorm';

export class BaseService<T> {
  constructor(private readonly baseRepository: BaseRepository<T>) {}

  async create(data: DeepPartial<T>): Promise<T> {
    return await this.baseRepository.createEntity(data);
  }

  async findAll(options?: FindManyOptions<T>, skip?: number, take?: number): Promise<T[]> {
    return await this.find(options, skip, take);
  }

  async find(options?: FindManyOptions<T>, skip?: number, take?: number): Promise<T[]> {
    return await this.baseRepository.findEntities(options, skip, take);
  }

  async findById(id: number, options?: FindManyOptions<T>): Promise<Partial<T> | null> {
    return await this.baseRepository.findEntityById(id, options);
  }

  async findOne(property: FindOptionsWhere<T>): Promise<T | null> {
    return await this.baseRepository.findEntityByProperty(property);
  }

  async update(id: number, data: Partial<T>): Promise<T> {
    return await this.baseRepository.updateEntity(id, data);
  }

  async deleteBy(options: FindOptionsWhere<T>): Promise<void> {
    await this.baseRepository.deleteEntityByProperty(options);
  }

  async deleteById(id: number): Promise<void> {
    await this.baseRepository.deleteEntityById(id);
  }
}
