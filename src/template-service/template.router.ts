import { Router } from 'express';
import { sendTemplate } from './components/sendTemplate';

export const templateRouter = Router();

templateRouter.get('/', sendTemplate);
//TODO recheck how we can handle it in single app.get
templateRouter.get('/1.html', sendTemplate);
templateRouter.get('/2.html', sendTemplate);


