import dotenv from 'dotenv';

const envFile =
  process.env.NODE_ENV === 'production'
    ? '.env.prod'
    : process.env.NODE_ENV === 'test'
      ? '.env.test'
      : '.env';
dotenv.config({ path: envFile });

export const configs = {
  NODE_ENV: process.env.NODE_ENV,
  PORT: process.env.PORT || 5000,
  database: {
    POSTGRES_HOST: process.env.POSTGRES_HOST || 'db',
    POSTGRES_PORT: parseInt(process.env.POSTGRES_PORT || '5432'),
    POSTGRES_USER: process.env.POSTGRES_USER || 'petcare_admin',
    POSTGRES_PASSWORD: process.env.POSTGRES_PASSWORD || 'petcare_admin',
    POSTGRES_DB: process.env.POSTGRES_DB || 'petcare_db',
  }
};