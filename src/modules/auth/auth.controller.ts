import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Req,
  Res,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';
import { Throttle } from '@nestjs/throttler';
import { Request, Response } from 'express';
import { generateCsrfoken } from 'src/configuration/csrf.config';
import { AuthService } from 'src/modules/auth/auth.service';
import { SignUpDto } from 'src/modules/auth/dto/auth.dto';
import { LocalAuthGuard } from 'src/modules/auth/guards/local.guard';
import { IsPublic } from 'src/modules/shared/decorators/isPublic.decorator';
import { _setCookiesOptions } from 'src/modules/shared/helpers/cookie.helpers';
import { ResponseService } from 'src/modules/shared/services/success-response.service';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly _authService: AuthService,
    private readonly _responseService: ResponseService,
  ) {}

  @IsPublic()
  @UseGuards(LocalAuthGuard)
  @HttpCode(200)
  @Post('login')
  @Throttle({ default: { limit: 5, ttl: 60000 } })
  async login(@Req() req, @Res({ passthrough: true }) res: Response) {
    const { access_token } = await this._authService.signIn(req.user);

    res.cookie('access_token', access_token, _setCookiesOptions());

    return this._responseService.success(true, HttpStatus.OK, 'User Logged', {
      access_token,
    });
  }

  @IsPublic()
  @HttpCode(201)
  @Post('register')
  @Throttle({ default: { limit: 10, ttl: 60000 } })
  async register(@Body() signUpDto: SignUpDto) {
    await this._authService.signUp(signUpDto.email, signUpDto.password, signUpDto.role);
    return this._responseService.success(true, HttpStatus.CREATED, 'User Created', null);
  }

  @IsPublic()
  @HttpCode(200)
  @Post('logout')
  async logout(@Res({ passthrough: true }) res: Response) {
    res.clearCookie('access_token', _setCookiesOptions(0));

    return this._responseService.success(true, HttpStatus.OK, 'User Logged Out', null);
  }

  @Get('csrf-token')
  @Throttle({ default: { limit: 30, ttl: 60000 } })
  getCsrfToken(@Req() req: Request, @Res() res: Response) {
    const csrfToken = generateCsrfoken(req, res, false);

    res.json({ csrf_token: csrfToken });
  }

  @Get('check-token')
  @Throttle({ default: { limit: 30, ttl: 60000 } })
  async getProfile(@Req() req: Request) {
    const token = req.cookies['access_token'];
    if (!token) throw new UnauthorizedException('Not authenticated');

    return { isAuthenticated: true };
  }
}
