import { Injectable } from '@nestjs/common';
import { BaseRepository } from 'src/modules/shared/repository/base.repository';
import { BaseService } from 'src/modules/shared/services/base.service';
import { UserQuestionHistoryEntity } from 'src/modules/user_question_history/entities/user_question_history.entity';

@Injectable()
export class UserQuestionHistoryService extends BaseService<UserQuestionHistoryEntity> {
  constructor(private readonly _repository: BaseRepository<UserQuestionHistoryEntity>) {
    super(_repository);
  }
}
