import { Module } from '@nestjs/common';
import { getRepositoryToken, TypeOrmModule } from '@nestjs/typeorm';
import { QuestionModule } from 'src/modules/question/question.module';
import { BaseRepository } from 'src/modules/shared/repository/base-repository';
import { UserAnswerEntity } from 'src/modules/user_answer/entities/user_answer.entity';
import { UserAnswerController } from 'src/modules/user_answer/user_answer.controller';
import { UserAnswerService } from 'src/modules/user_answer/user_answer.service';
import { Repository } from 'typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([UserAnswerEntity]), QuestionModule],
  controllers: [UserAnswerController],
  providers: [
    UserAnswerService,
    {
      provide: BaseRepository,
      useFactory: (repo: Repository<UserAnswerEntity>) =>
        new BaseRepository<UserAnswerEntity>(repo),
      inject: [getRepositoryToken(UserAnswerEntity)],
    },
  ],
})
export class UserAnswerModule {}
