import { DataSource } from 'typeorm';
import entities from '../entities/index.js';
import { configs } from './env.js';

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: configs.database.POSTGRES_HOST,
  port: configs.database.POSTGRES_PORT,
  username: configs.database.POSTGRES_USER,
  password: configs.database.POSTGRES_PASSWORD,
  database: configs.database.POSTGRES_DB,
  synchronize: true,
  logging: true,
  entities,
});
