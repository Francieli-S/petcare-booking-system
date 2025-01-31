import express from 'express';
import { AppDataSource } from './config/database.js';
import routers from '../src/routes/index.js';
import { configs } from './config/env.js';
import { setupSwagger } from './swagger.js';

const app = express();
app.use(express.json());
setupSwagger(app) // place swagger before mounting routes! So middlewares will not block access and affect swagger ui
app.use('/api', routers);

const connectToDB = async () => {
  try {
    await AppDataSource.initialize();
    console.log('✅ DB (PostgreSQL) connected');
  } catch (error) {
    console.log('❌ An error occured in the connection to the DB: ', error);
  }
};

const startServer = async () => {
  try {
    await connectToDB();
    app.listen(configs.PORT, () => {
      console.log(`🚀 Server running on http://localhost:${configs.PORT}`);
      console.log(`📄 Swagger docs available at http://localhost:${configs.PORT}/api-docs`);
    });
  } catch (error) {
    console.log('❌ Failed to start the server', error);
  }
};

startServer();
