import express from 'express';
import { AppDataSource } from '../../database/ormconfig.js';
import petHumanRouter from './routes.js';

const app = express();
app.use('/api/petHumans', petHumanRouter);

const connectToDB = async () => {
  try {
    await AppDataSource.initialize();
    console.log('DB (PostgreSQL) connected');
  } catch (error) {
    console.log('An error occured in the connection to the DB: ', error);
  }
};

export { app, connectToDB };