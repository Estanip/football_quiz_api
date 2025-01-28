import { OmitType } from '@nestjs/swagger';
import { CreateLevelDto } from 'src/modules/level/dto/create-level.dto';

export class GetLevelDto extends OmitType(CreateLevelDto, ['isActive'] as const) {}
