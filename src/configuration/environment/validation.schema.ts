import * as Joi from 'joi';

export const validationSchema = Joi.object({
  NODE_ENV: Joi.string().valid('development', 'production', 'test').default('development'),
  DB_TYPE: Joi.string().required(),
  DB_HOST: Joi.string().required(),
  DB_PORT: Joi.number().required().default(5432),
  DB_USERNAME: Joi.string().required(),
  DB_PASSWORD: Joi.string().required(),
  DB_NAME: Joi.string().required(),
  CACHE_HOST: Joi.string().required(),
  CACHE_PORT: Joi.number().required().default(6379),
  IS_PUBLIC_KEY: Joi.string().required(),
  JWT_SECRET: Joi.string().required(),
  PORT: Joi.number().required().default(3000),
  ROLES_KEY: Joi.string().required(),
});
