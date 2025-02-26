import { CacheModule } from '@nestjs/cache-manager';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { redisStore } from 'cache-manager-redis-yet';
import { RedisService } from 'src/common/cache/redis.service';

@Module({
  imports: [
    CacheModule.registerAsync({
      isGlobal: true,
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => {
        const storeConf = {
          socket: {
            host: configService.get('cache.host'),
            port: configService.get('cache.port'),
          },
        };

        if (configService.get('cache.password') !== '')
          storeConf['password'] = configService.get('cache.password');
        if (configService.get('cache.tls'))
          storeConf.socket['tls'] = configService.get('cache.tls');

        return {
          store: await redisStore(storeConf),
        };
      },
    }),
  ],
  providers: [RedisService],
  exports: [RedisService],
})
export class RedisModule {}
