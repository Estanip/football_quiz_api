import { Module } from '@nestjs/common';
import { getRepositoryToken, TypeOrmModule } from '@nestjs/typeorm';
import { BaseRepository } from 'src/modules/shared/repository/base-repository';
import { UserEntity } from 'src/modules/user/entities/user.entity';
import { UserController } from 'src/modules/user/user.controller';
import { UserService } from 'src/modules/user/user.service';
import { Repository } from 'typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity])],
  controllers: [UserController],
  providers: [
    UserService,
    {
      provide: BaseRepository,
      useFactory: (repo: Repository<UserEntity>) => new BaseRepository<UserEntity>(repo),
      inject: [getRepositoryToken(UserEntity)],
    },
  ],
})
export class UserModule {}
