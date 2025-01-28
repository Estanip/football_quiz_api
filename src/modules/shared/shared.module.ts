import { Module } from '@nestjs/common';
import { BaseRepository } from 'src/modules/shared/repository/base-repository';
import { BaseService } from 'src/modules/shared/services/base-service';

@Module({
  providers: [BaseRepository, BaseService],
  exports: [BaseRepository, BaseService],
})
export class SharedModule {}
