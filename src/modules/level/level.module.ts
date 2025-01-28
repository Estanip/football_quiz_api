import { Module } from '@nestjs/common';
import { getRepositoryToken, TypeOrmModule } from '@nestjs/typeorm';
import { RedisService } from 'src/common/cache/redis.service';
import { LevelEntity } from 'src/modules/level/entities/level.entity';
import { LevelController } from 'src/modules/level/level.controller';
import { LevelService } from 'src/modules/level/level.service';
import { BaseRepository } from 'src/modules/shared/repository/base-repository';
import { Repository } from 'typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([LevelEntity])],
  controllers: [LevelController],
  providers: [
    LevelService,
    RedisService,
    {
      provide: BaseRepository,
      useFactory: (repo: Repository<LevelEntity>) => new BaseRepository<LevelEntity>(repo),
      inject: [getRepositoryToken(LevelEntity)],
    },
  ],
})
export class LevelModule {}
