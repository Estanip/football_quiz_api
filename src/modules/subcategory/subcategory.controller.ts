import { Controller } from '@nestjs/common';
import { BaseController } from 'src/modules/shared/controllers/base.controller';
import { ResponseService } from 'src/modules/shared/services/success-response.service';
import { SubcategoryEntity } from 'src/modules/subcategory/entities/subcategory.entity';

import { CreateSubcategoryDto } from './dto/create-subcategory.dto';
import { GetSubcategoryDto } from './dto/get-subcategory.dto';
import { SubcategoryService } from './subcategory.service';

@Controller('subcategory')
export class SubcategoryController extends BaseController<
  SubcategoryEntity,
  CreateSubcategoryDto,
  GetSubcategoryDto
> {
  constructor(
    private readonly _subcategoryService: SubcategoryService,
    private readonly _responseService: ResponseService,
  ) {
    super(_subcategoryService, _responseService, CreateSubcategoryDto, GetSubcategoryDto);
  }
}
