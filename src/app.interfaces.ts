import { Express } from 'express';

export interface Service {
  name: string;
  app: Express,
  port: number
}
