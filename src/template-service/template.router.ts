import { Router } from 'express';
import { sendTemplate } from './components/sendTemplate';

export const templateRouter = Router();

templateRouter.get(/.*/, sendTemplate);
