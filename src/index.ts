import express from 'express';
import { AppDataSource } from '../src/database/ormconfig.js';
import routers from '../src/routes/index.js';
import dotenv from 'dotenv';

dotenv.config();
const PORT = process.env.PORT || 3001;

const app = express();
app.use(express.json());
app.use('/api', routers);

const connectToDB = async () => {
  try {
    await AppDataSource.initialize();
    console.log('DB (PostgreSQL) connected');
  } catch (error) {
    console.log('An error occured in the connection to the DB: ', error);
  }
};

const startServer = async () => {
  try {
    await connectToDB();
    app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.log('Failed to start the server', error);
  }
};

startServer();
