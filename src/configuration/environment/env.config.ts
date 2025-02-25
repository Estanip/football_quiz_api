import * as dotenv from 'dotenv';
import { join } from 'path';

export const loadEnvironment = () => {
  const envFile =
    process.env.NODE_ENV === 'test' ? join(process.cwd(), 'test.env') : join(process.cwd(), '.env');
  return dotenv.config({ path: envFile });
};

export type Environment = {
  NODE_ENV: string;
  DB_TYPE: string;
  DB_HOST: string;
  DB_PORT: string;
  DB_USERNAME: string;
  DB_PASSWORD: string;
  DB_NAME: string;
  DB_SYNCHRONIZE: string;
  CACHE_HOST: string;
  CACHE_PASSWORD: string;
  CACHE_PORT: string;
  CSRF_SECRET: string;
  CSRF_COOKIE_TOKEN_NAME: string;
  IS_PUBLIC_KEY: string;
  JWT_SECRET: string;
  NO_CSRF_KEY: string;
  PORT: string;
  ROLES_KEY: string;
};

interface EnvVariables {
  database: {
    type: string;
    host: string;
    port: number;
    username: string;
    password: string;
    name: string;
    synchronize: boolean;
  };
  cache: {
    host: string;
    password: string;
    port: number;
  };
  csrf: { cookie_token_name: string; secret: string };

  env: string;
  jwt: {
    secret: string;
  };
  keys: { is_public: string; no_csrf: string; roles: string };
  port: number;
}

const env = process.env as Environment;

export default (): EnvVariables => ({
  database: {
    type: env.DB_TYPE,
    host: env.DB_HOST,
    port: parseInt(env.DB_PORT, 10) || 5432,
    username: env.DB_USERNAME,
    password: env.DB_PASSWORD,
    name: env.DB_NAME,
    synchronize: env.DB_SYNCHRONIZE === 'true',
  },
  cache: {
    host: env.CACHE_HOST,
    password: env.CACHE_PASSWORD ? env.CACHE_PASSWORD : '',
    port: parseInt(env.CACHE_PORT, 10),
  },
  csrf: {
    cookie_token_name: env.CSRF_COOKIE_TOKEN_NAME,
    secret: env.CSRF_SECRET,
  },
  env: env.NODE_ENV,
  jwt: {
    secret: env.JWT_SECRET,
  },
  keys: {
    is_public: env.IS_PUBLIC_KEY,
    no_csrf: env.NO_CSRF_KEY,
    roles: env.ROLES_KEY,
  },
  port: parseInt(env.PORT, 10) || 3000,
});
