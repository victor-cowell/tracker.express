import { Router } from 'express';
import { getTestModule } from './components/getTestModule';
import { deleteEvents, getEvents } from './components/testAPI';

export const testRouter = Router();
testRouter.get('/', getTestModule);
testRouter.get('/events', getEvents);
testRouter.delete('/events', deleteEvents);
