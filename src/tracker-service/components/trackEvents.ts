import { Request, Response } from 'express';
import { TrackerEventModel } from '../../models/trackerEvent';
import { TrackerEvent, TrackerEventType } from '../tracker.interface';

export const trackEvents = async (req: Request<null, TrackerEvent[], TrackerEvent[]>, res: Response) => {
  console.log('trackEvents', req.body?.length);
  res.status(200);
  res.send();
  const events = req.body.map((data: TrackerEvent)=> new TrackEventImp(data));
  const validEvents = events.filter((event)=> event.validate());
  await TrackerEventModel.collection.insertMany(validEvents);
};

function validateEvent(event: TrackerEvent): boolean {
  const eventKeys = Object.keys(event) as Array<keyof TrackerEvent>;
  const requestedKeys: string[] = ['event', 'tags', 'url', 'title', 'ts'];
  for (const key of eventKeys) {
    if (!requestedKeys.includes(key) || !event[key]) {
      return false;
    }
  }
  // const eventsTypes = ['page-view', 'click-button', 'click-link', 'test', 'click-test-button];
  return true;
}

class TrackEventImp implements TrackerEvent {
  event: TrackerEventType;
  tags: string[];
  url: string;
  title: string;
  ts: Date;

  constructor(trackEvent: TrackerEvent) {
    this.event = trackEvent.event;
    this.tags = trackEvent.tags;
    this.url = trackEvent.url;
    this.title = trackEvent.title;
    this.ts = trackEvent.ts;
  }

  validate() {
    if (!this.event || !this.tags || !this.url || !this.title || !this.ts) {
      return false;
    }
    if(!Array.isArray(this.tags)){
      return false;
    }
    const date = new Date(this.ts).getTime();
    return !isNaN(date);

  }
}
