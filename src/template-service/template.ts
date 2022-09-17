import express, { Express, Request, Response } from 'express';
import path from 'path';

const app: Express = express();
const port = parseInt(process.env.TEMPLATE_SERVICE_PORT!);

const sendTemplate: (req: Request, res: Response) => void = (req: Request, res: Response) => {
  res.sendFile(path.join(__dirname, 'pages', 'index.html'));
};

app.get('/', sendTemplate);
//TODO recheck how we can handle it in single app.get
app.get('/1.html', sendTemplate);
app.get('/2.html', sendTemplate);

export const templateService = {
  name: 'Template Service',
  app,
  port
};
