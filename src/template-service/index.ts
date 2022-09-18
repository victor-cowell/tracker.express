import express, { Express } from 'express';
import { Service } from '../app.interfaces';
import { templateRouter } from './template.router';

const port = parseInt(process.env.TEMPLATE_SERVICE_PORT!);
const app: Express = express();

app.use('/', templateRouter);

export const templateService: Service = {
  name: 'Template Service',
  app,
  port
};
