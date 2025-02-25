import {
  DeepPartial,
  FindManyOptions,
  FindOneOptions,
  FindOptionsWhere,
  Repository,
} from 'typeorm';

export class BaseRepository<T> {
  constructor(private readonly _repository: Repository<T>) {}

  async createEntity(data: DeepPartial<T>): Promise<T> {
    const entity = this._repository.create(data);
    return await this._repository.save(entity);
  }

  async findEntities(options?: FindManyOptions<T>, skip?: number, take?: number): Promise<T[]> {
    const where = { ...options?.where, isActive: true };
    return await this._repository.find({ ...options, where, skip, take });
  }

  async findEntityById(id: number, options?: FindOneOptions<T>): Promise<T | null> {
    return await this._repository.findOne({
      where: { id } as FindOptionsWhere<{ id }>,
      ...options,
    });
  }

  async findEntityByProperty(property: FindOptionsWhere<T>): Promise<T | null> {
    return await this._repository.findOneBy(property);
  }

  async updateEntity(id: number, data: Partial<T>): Promise<T> {
    await this._repository.update(id, data as any);
    return await this.findEntityById(id);
  }

  async deleteEntityByProperty(options: FindOptionsWhere<T>): Promise<void> {
    await this._repository.delete(options);
  }

  async deleteEntityById(id: number): Promise<void> {
    await this._repository.delete(id);
  }

  // Getters
  public createQueryBuilder(entity: string) {
    return this._repository.createQueryBuilder(entity);
  }
}
