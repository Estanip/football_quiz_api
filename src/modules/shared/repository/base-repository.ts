import { DeepPartial, FindManyOptions, FindOptionsWhere, Repository } from 'typeorm';

export class BaseRepository<T> {
  constructor(private readonly repository: Repository<T>) {}

  async create(data: DeepPartial<T>): Promise<T> {
    const entity = this.repository.create(data);
    return await this.repository.save(entity);
  }

  async find(options?: FindManyOptions<T>, skip?: number, take?: number): Promise<T[]> {
    const where = { ...options?.where, isActive: true };
    return await this.repository.find({ ...options, where, skip, take });
  }

  async findById(id: number, options?: FindManyOptions<T>): Promise<T | null> {
    return await this.repository.findOne({ where: { id } as any, ...options });
  }

  async findOne(property: FindOptionsWhere<T>): Promise<T | null> {
    return await this.repository.findOneBy(property);
  }

  async update(id: number, data: Partial<T>): Promise<T> {
    await this.repository.update(id, data as any);
    return await this.findById(id);
  }

  async delete(id: number): Promise<void> {
    await this.repository.delete(id);
  }
}
