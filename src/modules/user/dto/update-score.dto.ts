import { PickType } from '@nestjs/swagger';
import { CreateUserDto } from 'src/modules/user/dto/create-user.dto';

export class UpdateUserScoreDto extends PickType(CreateUserDto, ['score']) {}
