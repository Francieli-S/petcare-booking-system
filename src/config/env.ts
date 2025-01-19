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
    DB_HOST: process.env.DB_HOST || 'db',
    DB_PORT: parseInt(process.env.DB_PORT || '5432'),
    DB_USERNAME: process.env.DB_USERNAME || 'petcare_admin',
    DB_PASSWORD: process.env.DB_PASSWORD || 'petcare_admin',
    DB_NAME: process.env.DB_NAME || 'petcare_db',
  }
};