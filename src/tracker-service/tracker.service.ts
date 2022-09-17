import express, { Express, Request, Response } from 'express';
import path from 'path';
import { Service } from '../app.interfaces';
import { TrackerEvent, TrackerEventType } from './tracker.interface';

const app: Express = express();
const port = parseInt(process.env.TRACKER_SERVICE_PORT!);

app.get('/', (req: Request, res: Response) => {
  res.sendFile(path.join(__dirname, 'tracker.js'));
});

app.get('/track', (req: Request<null, TrackerEvent[], TrackerEvent[]>, res: Response) => {
  const validEvents = req.body.filter(validateEvent);
  res.send(validEvents);
});

function validateEvent(event: TrackerEvent): boolean {
  const eventKeys = Object.keys(event);
  const requestedKeys: string[] = ['event', 'tags', 'url', 'title', 'ts'];
  for (const key of eventKeys) {
    //@ts-ignore
    if (!requestedKeys.includes(key) || !event[key]) {
      return false;
    }
  }
  // TODO we can add check on event type
  // const eventsTypes = ['page-view', 'click-button', 'click-link', 'test'];
  return true;

}

export const trackerService: Service = {
  name: 'Tracker Service',
  app,
  port
};
