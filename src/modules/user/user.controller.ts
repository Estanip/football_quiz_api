import { Body, Controller, HttpStatus, Patch, Req, UseGuards } from '@nestjs/common';
import { Throttle, ThrottlerGuard } from '@nestjs/throttler';
import { BaseController } from 'src/modules/shared/controllers/base.controller';
import { ResponseService } from 'src/modules/shared/services/success-response.service';
import { CreateUserDto } from 'src/modules/user/dto/create-user.dto';
import { GetUserDto } from 'src/modules/user/dto/get-user.dto';
import { UpdateUserFavTeamDto } from 'src/modules/user/dto/update-favTeam.dto';
import { UpdateUserScoreDto } from 'src/modules/user/dto/update-score.dto';
import { UpdateUserUsernameDto } from 'src/modules/user/dto/update-username.dto';
import { UserEntity } from 'src/modules/user/entities/user.entity';
import { UserService } from 'src/modules/user/user.service';

@Controller('user')
export class UserController extends BaseController<UserEntity, CreateUserDto, GetUserDto> {
  constructor(
    private readonly _userService: UserService,
    private readonly _responseService: ResponseService,
  ) {
    super(_userService, _responseService, CreateUserDto, GetUserDto);
  }

  @UseGuards(ThrottlerGuard)
  @Throttle({ default: { limit: 15, ttl: 60000 } })
  @Patch('/score')
  async updateScore(@Req() req, @Body() { score }: UpdateUserScoreDto) {
    await this._userService.updateScore(req.user.id, score);
    return this._responseService.success(true, HttpStatus.OK, 'Score successfully updated', null);
  }

  @UseGuards(ThrottlerGuard)
  @Throttle({ default: { limit: 15, ttl: 60000 } })
  @Patch('/username')
  async updateUsername(@Req() req, @Body() { username }: UpdateUserUsernameDto) {
    await this._userService.updateProperty(req.user.id, username, 'username');
    return this._responseService.success(
      true,
      HttpStatus.OK,
      'Username successfully updated',
      null,
    );
  }

  @UseGuards(ThrottlerGuard)
  @Throttle({ default: { limit: 15, ttl: 60000 } })
  @Patch('/fav_team')
  async updateFavTeam(@Req() req, @Body() { fav_team }: UpdateUserFavTeamDto) {
    await this._userService.updateProperty(req.user.id, fav_team, 'fav_team');
    return this._responseService.success(
      true,
      HttpStatus.OK,
      'Favorite team successfully updated',
      null,
    );
  }
}
