import { Request, Response } from 'express';
import path from 'path';

export const sendTemplate: (req: Request, res: Response) => void = (req: Request, res: Response) => {
  res.sendFile(path.join(__dirname, 'index.html'));
};
