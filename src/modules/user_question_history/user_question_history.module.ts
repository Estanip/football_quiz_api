import { Module } from '@nestjs/common';
import { getRepositoryToken, TypeOrmModule } from '@nestjs/typeorm';
import { BaseRepository } from 'src/modules/shared/repository/base.repository';
import { UserQuestionHistoryEntity } from 'src/modules/user_question_history/entities/user_question_history.entity';
import { UserQuestionHistoryController } from 'src/modules/user_question_history/user_question_history.controller';
import { UserQuestionHistoryService } from 'src/modules/user_question_history/user_question_history.service';
import { Repository } from 'typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([UserQuestionHistoryEntity])],
  controllers: [UserQuestionHistoryController],
  providers: [
    UserQuestionHistoryService,
    {
      provide: BaseRepository,
      useFactory: (repo: Repository<UserQuestionHistoryEntity>) =>
        new BaseRepository<UserQuestionHistoryEntity>(repo),
      inject: [getRepositoryToken(UserQuestionHistoryEntity)],
    },
  ],
  exports: [UserQuestionHistoryService],
})
export class UserQuestionHistoryModule {}
