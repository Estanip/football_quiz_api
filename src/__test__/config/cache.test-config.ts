import { CacheModuleOptions } from '@nestjs/cache-manager';
import { redisStore } from 'cache-manager-redis-yet';
import { Environment, loadEnvironment } from 'src/configuration/environment/env.config';
loadEnvironment();

export const redisTestConfig = async (): Promise<CacheModuleOptions> => {
  const env = process.env as Environment;
  return {
    store: redisStore,
    host: env.CACHE_HOST,
    port: env.CACHE_PORT,
    ttl: 10,
  };
};
