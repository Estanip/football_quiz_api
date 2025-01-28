import { Module } from '@nestjs/common';
import { getRepositoryToken, TypeOrmModule } from '@nestjs/typeorm';
import { QuestionEntity } from 'src/modules/question/entities/question.entity';
import { QuestionController } from 'src/modules/question/question.controller';
import { QuestionService } from 'src/modules/question/question.service';
import { BaseRepository } from 'src/modules/shared/repository/base-repository';
import { Repository } from 'typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([QuestionEntity])],
  controllers: [QuestionController],
  providers: [
    QuestionService,
    {
      provide: BaseRepository,
      useFactory: (repo: Repository<QuestionEntity>) => new BaseRepository<QuestionEntity>(repo),
      inject: [getRepositoryToken(QuestionEntity)],
    },
  ],
  exports: [QuestionService],
})
export class QuestionModule {}
