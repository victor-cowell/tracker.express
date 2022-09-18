import { Request, Response } from 'express';
import path from 'path';

export const getTracker = (req: Request, res: Response) => {
  res.sendFile(path.join(__dirname, 'tracker.js'));
};
