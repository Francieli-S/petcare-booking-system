import { DataSource } from 'typeorm';
import { User } from '../entities/User.js';
import { Sitter } from '../entities/Sitter.js';
import { PetHuman } from '../entities/PetHuman.js';
import { Booking } from '../entities/Booking.js';

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: '',
  password: '',
  database: 'petcare_booking_system',
  synchronize: true,
  logging: true,
  entities: [User, Sitter, PetHuman, Booking],
});
