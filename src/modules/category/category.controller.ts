import { Controller } from '@nestjs/common';
import { CategoryService } from 'src/modules/category/category.service';
import { CategoryEntity } from 'src/modules/category/entities/category.entity';
import { BaseController } from 'src/modules/shared/controllers/base-controller';
import { ResponseService } from 'src/modules/shared/services/success-response.service';

import { CreateCategoryDto } from './dto/create-category.dto';
import { GetCategoryDto } from './dto/get-category.dto';

@Controller('category')
export class CategoryController extends BaseController<
  CategoryEntity,
  CreateCategoryDto,
  GetCategoryDto
> {
  constructor(
    private readonly _subcategoryService: CategoryService,
    private readonly _responseService: ResponseService,
  ) {
    super(_subcategoryService, _responseService, CreateCategoryDto, GetCategoryDto);
  }
}
