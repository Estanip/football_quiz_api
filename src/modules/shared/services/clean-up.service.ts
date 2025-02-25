import { Injectable } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { InjectRepository } from '@nestjs/typeorm';
import { UserQuestionHistoryEntity } from 'src/modules/user_question_history/entities/user_question_history.entity';
import { MoreThan, Repository } from 'typeorm';

@Injectable()
export class CleanupService {
  constructor(
    @InjectRepository(UserQuestionHistoryEntity)
    private historyRepository: Repository<UserQuestionHistoryEntity>,
  ) {}

  @Cron('0 0 */15 * *')
  async cleanupOldHistories() {
    console.log('🧹 Eliminando historiales de preguntas de más de 15 días...');
    await this.historyRepository.delete({
      createdAt: MoreThan(new Date(Date.now() - 15 * 24 * 60 * 60 * 1000)),
    });
  }
}
