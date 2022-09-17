import express, { Express, Request, Response } from 'express';

const app: Express = express();
const port = parseInt(process.env.PORT!);

app.get('/', (req: Request, res: Response) => {
  res.send('Server is running');
});

app.listen(port, () => {
  console.log(`Server is running on ${port}`);
});
