import cors from 'cors';
import express, { Express } from 'express';
import { Service } from '../app.interfaces';
import { testRouter } from './test.router';

const app: Express = express();
const port = parseInt(process.env.TEST_SERVICE_PORT!);

const allowedOrigins = ['http://localhost:8000'];
const options: cors.CorsOptions = {
  origin: allowedOrigins
};

app.use(cors(options));
app.use(express.json());
app.use('/', testRouter);
export const testService: Service = {
  name: 'Test Service',
  app,
  port
};
