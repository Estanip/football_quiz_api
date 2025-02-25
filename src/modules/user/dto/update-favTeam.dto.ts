import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class UpdateUserFavTeamDto {
  @ApiProperty({ description: 'Favorite Soccer Team', example: 'Boca Juniors' })
  @IsNotEmpty()
  fav_team?: string;
}
