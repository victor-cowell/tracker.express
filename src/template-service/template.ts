import express, { Express, Request, Response } from 'express';

const app: Express = express();
const port = parseInt(process.env.TEMPLATE_SERVICE_PORT!);

app.get('/', (req: Request, res: Response) => {
  res.send('Template Server is running');
});

export const templateService = {
  name: 'Template Service',
  app,
  port
};
