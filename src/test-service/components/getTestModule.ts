import { Request, Response } from 'express';
import path from 'path';

export const getTestModule = (req: Request, res: Response) => {
  res.sendFile(path.join(__dirname, 'test-module.js'));
}
