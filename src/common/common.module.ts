import { Global, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import envConfiguration from 'src/configuration/environment/env.config';
import { ResponseService } from 'src/modules/shared/services/success-response.service';

@Global()
@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: process.env.NODE_ENV === 'test' ? 'test.env' : '.env',
      isGlobal: true,
      load: [envConfiguration],
    }),
  ],
  providers: [ResponseService],
  exports: [ResponseService],
})
export class CommonModule {}
