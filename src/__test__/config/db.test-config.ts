import { join } from 'path';
import { DataSourceOptions } from 'typeorm';

import { Environment, loadEnvironment } from '../../configuration/environment/env.config';
loadEnvironment();

export const dbTestConfig = (): DataSourceOptions => {
  const env = process.env as Environment;
  return {
    type: env.DB_TYPE as any,
    host: env.DB_HOST,
    port: parseInt(env.DB_PORT, 10),
    username: env.DB_USERNAME,
    password: env.DB_PASSWORD,
    database: env.DB_NAME,
    entities: [join(process.cwd()) + '/src/modules/**/*.entity{.ts,.js}'],
    synchronize: true,
    //logging: true,
  };
};
