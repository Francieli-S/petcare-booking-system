import express from 'express';
import { AppDataSource } from '../src/database/ormconfig.js';
import routers from '../src/routes/index.js';

const app = express();
app.use('/api', routers);

let isConnected = false

const connectToDB = async () => {
  if(!isConnected) {
    try {
      await AppDataSource.initialize();
      isConnected = true
      console.log('DB (PostgreSQL) connected');
    } catch (error) {
      console.log('An error occured in the connection to the DB: ', error);
    }
  }
};

export { app, connectToDB };
