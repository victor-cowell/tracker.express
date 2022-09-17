import { Express } from 'express';

export interface ServiceInterface {
  name: string;
  app: Express,
  port: number
}
