import { Request, Response } from 'express';
import { TrackerEvent } from '../tracker.interface';

export const trackEvents = (req: Request<null, TrackerEvent[], TrackerEvent[]>, res: Response) => {
  console.log(req.body);
  const validEvents = req.body.filter(validateEvent);
  res.send(validEvents);
}

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
