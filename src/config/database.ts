import { DataSource } from 'typeorm';
import entities from '../entities/index.js';
import { configs } from './env.js';

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: configs.database.DB_HOST,
  port: configs.database.DB_PORT,
  username: configs.database.DB_USERNAME,
  password: configs.database.DB_PASSWORD,
  database: configs.database.DB_NAME,
  synchronize: true,
  logging: true,
  entities,
});
