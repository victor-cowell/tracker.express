import express, { Express } from 'express';
import { Service } from '../app.interfaces';
import { trackerRouter } from './tracker.router';
import cors from 'cors';

const app: Express = express();
const port = parseInt(process.env.TRACKER_SERVICE_PORT!);

const allowedOrigins = [`http://localhost:${process.env.TEMPLATE_SERVICE_PORT}`];
const options: cors.CorsOptions = {
  origin: allowedOrigins,
};
app.use(cors(options));
app.use(express.json());
app.use('/', trackerRouter);

export const trackerService: Service = {
  name: 'Tracker Service',
  app,
  port,
};
