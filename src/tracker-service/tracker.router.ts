import { Router } from 'express';
import { getTracker } from './components/getTracker';
import { trackEvents } from './components/trackEvents';

export const trackerRouter = Router();
trackerRouter.get('/', getTracker);
trackerRouter.post('/track', trackEvents);
