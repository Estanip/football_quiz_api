import { BaseRepository } from 'src/modules/shared/repository/base-repository';
import { DeepPartial, FindManyOptions, FindOptionsWhere } from 'typeorm';

export class BaseService<T> {
  constructor(protected readonly baseRepository: BaseRepository<T>) {}

  async create(data: DeepPartial<T>): Promise<T> {
    return await this.baseRepository.create(data);
  }

  async findAll(options?: FindManyOptions<T>, skip?: number, take?: number): Promise<Partial<T>[]> {
    return await this.find(options, skip, take);
  }

  async find(options?: FindManyOptions<T>, skip?: number, take?: number): Promise<T[]> {
    return await this.baseRepository.find(options, skip, take);
  }

  async findById(id: number, options?: FindManyOptions<T>): Promise<Partial<T> | null> {
    return await this.baseRepository.findById(id, options);
  }

  async findOne(property: FindOptionsWhere<T>): Promise<T | null> {
    return await this.baseRepository.findOne(property);
  }

  async update(id: number, data: Partial<T>): Promise<T> {
    return await this.baseRepository.update(id, data);
  }

  async delete(id: number): Promise<void> {
    await this.baseRepository.delete(id);
  }
}
