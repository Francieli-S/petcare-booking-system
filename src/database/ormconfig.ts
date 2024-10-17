import { DataSource } from 'typeorm';
import { User } from '../entities/User.js';
import { Sitter } from '../entities/Sitter.js';
import { PetHuman } from '../entities/PetHuman.js';
import { Booking } from '../entities/Booking.js';
import dotenv from 'dotenv'

dotenv.config()

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT || '5432'),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  synchronize: true,
  logging: true,
  entities: [User, Sitter, PetHuman, Booking],
});
