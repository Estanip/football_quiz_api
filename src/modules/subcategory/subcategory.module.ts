import { Module } from '@nestjs/common';
import { getRepositoryToken, TypeOrmModule } from '@nestjs/typeorm';
import { BaseRepository } from 'src/modules/shared/repository/base.repository';
import { SubcategoryEntity } from 'src/modules/subcategory/entities/subcategory.entity';
import { Repository } from 'typeorm';

import { SubcategoryController } from './subcategory.controller';
import { SubcategoryService } from './subcategory.service';

@Module({
  imports: [TypeOrmModule.forFeature([SubcategoryEntity])],
  controllers: [SubcategoryController],
  providers: [
    SubcategoryService,
    {
      provide: BaseRepository,
      useFactory: (repo: Repository<SubcategoryEntity>) =>
        new BaseRepository<SubcategoryEntity>(repo),
      inject: [getRepositoryToken(SubcategoryEntity)],
    },
  ],
})
export class SubcategoryModule {}
