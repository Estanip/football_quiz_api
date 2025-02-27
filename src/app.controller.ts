import { Controller, Get, Req, Res, UseGuards } from '@nestjs/common';
import { Throttle, ThrottlerGuard } from '@nestjs/throttler';
import { AppService } from 'src/app.service';
import { IsPublic } from 'src/modules/shared/decorators/isPublic.decorator';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @IsPublic()
  @Get()
  @UseGuards(ThrottlerGuard)
  @Throttle({ default: { limit: 60, ttl: 60000 } })
  get(@Req() req: Request, @Res() res) {
    return res.json({
      message: `Welcome to Futbol Quiz API, go to http://${req?.headers['host']}/api to see available endpoints`,
    });
  }

  @IsPublic()
  @Get('health')
  @UseGuards(ThrottlerGuard)
  @Throttle({ default: { limit: 60, ttl: 60000 } })
  health(): string {
    return this.appService.getHealth();
  }
}
