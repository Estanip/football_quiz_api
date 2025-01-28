import { Module } from '@nestjs/common';
import { getRepositoryToken, TypeOrmModule } from '@nestjs/typeorm';
import { CategoryEntity } from 'src/modules/category/entities/category.entity';
import { BaseRepository } from 'src/modules/shared/repository/base-repository';
import { Repository } from 'typeorm';

import { CategoryController } from './category.controller';
import { CategoryService } from './category.service';

@Module({
  imports: [TypeOrmModule.forFeature([CategoryEntity])],
  controllers: [CategoryController],
  providers: [
    CategoryService,
    {
      provide: BaseRepository,
      useFactory: (repo: Repository<CategoryEntity>) => new BaseRepository<CategoryEntity>(repo),
      inject: [getRepositoryToken(CategoryEntity)],
    },
  ],
})
export class CategoryModule {}
