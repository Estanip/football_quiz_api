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
  DB_SSL: string;
  CACHE_HOST: string;
  CACHE_PASSWORD: string;
  CACHE_PORT: string;
  CACHE_TLS: string;
  CSRF_SECRET: string;
  IS_PUBLIC_KEY: string;
  JWT_SECRET: string;
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
    ssl: boolean;
  };
  cache: {
    host: string;
    password: string;
    port: number;
    tls: boolean;
  };
  csrf: { secret: string };
  env: string;
  jwt: {
    secret: string;
  };
  keys: { is_public: string; roles: string };
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
    ssl: env.DB_SSL === 'true' && Boolean(env.DB_SSL),
  },
  cache: {
    host: env.CACHE_HOST,
    password: env.CACHE_PASSWORD ? env.CACHE_PASSWORD : '',
    port: parseInt(env.CACHE_PORT, 10),
    tls: env.CACHE_TLS === 'true' && Boolean(env.CACHE_TLS),
  },
  csrf: {
    secret: env.CSRF_SECRET,
  },
  env: env.NODE_ENV,
  jwt: {
    secret: env.JWT_SECRET,
  },
  keys: {
    is_public: env.IS_PUBLIC_KEY,
    roles: env.ROLES_KEY,
  },
  port: parseInt(env.PORT, 10) || 3000,
});
