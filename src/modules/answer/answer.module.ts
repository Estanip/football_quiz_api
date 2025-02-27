import { Module } from '@nestjs/common';
import { getRepositoryToken, TypeOrmModule } from '@nestjs/typeorm';
import { AnswerEntity } from 'src/modules/answer/entities/answer.entity';
import { BaseRepository } from 'src/modules/shared/repository/base.repository';
import { Repository } from 'typeorm';

import { AnswerController } from './answer.controller';
import { AnswerService } from './answer.service';

@Module({
  imports: [TypeOrmModule.forFeature([AnswerEntity])],
  controllers: [AnswerController],
  providers: [
    AnswerService,
    {
      provide: BaseRepository,
      useFactory: (repo: Repository<AnswerEntity>) => new BaseRepository<AnswerEntity>(repo),
      inject: [getRepositoryToken(AnswerEntity)],
    },
  ],
})
export class AnswerModule {}
