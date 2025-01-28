import { Injectable } from '@nestjs/common';
import { BaseRepository } from 'src/modules/shared/repository/base-repository';
import { BaseService } from 'src/modules/shared/services/base-service';
import { UserEntity } from 'src/modules/user/entities/user.entity';

@Injectable()
export class UserService extends BaseService<UserEntity> {
  constructor(private readonly _repository: BaseRepository<UserEntity>) {
    super(_repository);
  }

  async findAll(): Promise<Partial<UserEntity>[]> {
    return await this.find({
      select: ['id', 'email', 'role'],
    });
  }

  async findOneByEmail(email: string): Promise<UserEntity> {
    return await this.findOne({ email });
  }
}
