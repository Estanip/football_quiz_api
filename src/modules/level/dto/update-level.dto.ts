import { PartialType, PickType } from '@nestjs/swagger';
import { CreateLevelDto } from 'src/modules/level/dto/create-level.dto';

export class UpdateLevelDto extends PartialType(CreateLevelDto) {}
export class UpdateLevelNameDto extends PickType(CreateLevelDto, ['name'] as const) {}
