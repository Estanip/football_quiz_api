import { Controller } from '@nestjs/common';
import { ApiCookieAuth } from '@nestjs/swagger';
import { CreateLevelDto } from 'src/modules/level/dto/create-level.dto';
import { GetLevelDto } from 'src/modules/level/dto/get-level.dto';
import { LevelEntity } from 'src/modules/level/entities/level.entity';
import { LevelService } from 'src/modules/level/level.service';
import { BaseController } from 'src/modules/shared/controllers/base.controller';
import { ResponseService } from 'src/modules/shared/services/success-response.service';

@ApiCookieAuth()
@Controller({ path: 'level' })
export class LevelController extends BaseController<LevelEntity, CreateLevelDto, GetLevelDto> {
  constructor(
    private readonly _levelService: LevelService,
    private readonly _responseService: ResponseService,
  ) {
    super(_levelService, _responseService, CreateLevelDto, GetLevelDto);
  }
}
