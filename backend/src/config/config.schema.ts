import * as Joi from 'joi';

export const configValidationSchema = Joi.object({
  // Node environment
  NODE_ENV: Joi.string()
    .valid('development', 'production', 'test')
    .default('development'),

  // Server
  PORT: Joi.number().default(80),

  // JWT
  JWT_SECRET_KEY: Joi.string().required(),
  JWT_ALGORITHM: Joi.string()
    .valid('HS256', 'HS384', 'HS512', 'RS256', 'RS384', 'RS512')
    .default('HS256'),
  JWT_EXPIRATION: Joi.string().default('15m'),
  JWT_REFRESH_EXPIRATION: Joi.string().default('7d'),
  CSRF_SECRET_KEY: Joi.string().optional(),
  ADMIN_EMAIL: Joi.string().email({ tlds: false }).default('admin@bbl.test'),
  ADMIN_PASSWORD: Joi.string().default('admin123'),
  ADMIN_NAME: Joi.string().default('BBL Admin'),

  // Database connection
  DATABASE_URL: Joi.string().required(),

  // Individual database config
  DB_HOST: Joi.string().default('localhost'),
  DB_PORT: Joi.number().default(5432),
  DB_USERNAME: Joi.string().required(),
  DB_PASSWORD: Joi.optional(),
  DB_NAME: Joi.string().required(),
  // CORS
  CORS_ORIGINS: Joi.string().default(
    'http://localhost:3001,http://localhost:3000,http://localhost:5173',
  ),

  // PostgreSQL binaries paths (optional)
  PG_DUMP_PATH: Joi.string(),
  PSQL_PATH: Joi.string(),
});
