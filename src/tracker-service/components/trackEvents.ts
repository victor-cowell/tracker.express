import { Request, Response } from 'express';
import { TrackerEventModel } from '../../models/trackerEvent';
import { TrackerEvent, TrackerEventType } from '../tracker.interface';

export const trackEvents = async (req: Request<null, TrackerEvent[], TrackerEvent[]>, res: Response) => {
  console.log('trackEvents', req.body?.length);
  res.status(200);
  res.send();
  const events: TrackEventImp[] = req.body.map((data: TrackerEvent) => new TrackEventImp(data));
  const validEvents: TrackEventImp[] = events.filter((event) => event.validate());
  await TrackerEventModel.collection.insertMany(validEvents);
};

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

  validate(): boolean {
    if (!this.event || !this.tags || !this.url || !this.title || !this.ts) {
      return false;
    }
    if (!Array.isArray(this.tags)) {
      return false;
    }
    const date = new Date(this.ts).getTime();
    return !isNaN(date);
  }
}
