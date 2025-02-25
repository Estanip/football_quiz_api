import { Injectable } from '@nestjs/common';
import { BaseRepository } from 'src/modules/shared/repository/base.repository';
import { BaseService } from 'src/modules/shared/services/base.service';
import { UserEntity } from 'src/modules/user/entities/user.entity';
import { FindManyOptions, UpdateResult } from 'typeorm';

@Injectable()
export class UserService extends BaseService<UserEntity> {
  constructor(private readonly _repository: BaseRepository<UserEntity>) {
    super(_repository);
  }

  async findAll(
    options?: FindManyOptions<UserEntity>,
    skip?: number,
    take?: number,
  ): Promise<UserEntity[]> {
    const customOptions: FindManyOptions<UserEntity> = {
      select: ['id', 'email', 'role'],
    };

    return this.find(customOptions, skip, take);
  }

  async findOneByEmail(email: string): Promise<UserEntity> {
    return await this.findOne({ email });
  }

  async updateScore(userId: number, score: number): Promise<UpdateResult> {
    return await this._repository
      .createQueryBuilder('users')
      .update(UserEntity)
      .set({ score: () => `"score" + ${score}` })
      .where('id = :id', { id: userId })
      .execute();
  }

  async updateProperty(userId: number, value: string, field: string): Promise<UpdateResult> {
    return await this._repository
      .createQueryBuilder('users')
      .update(UserEntity)
      .set({ [field]: value })
      .where('id = :id', { id: userId })
      .execute();
  }
}
