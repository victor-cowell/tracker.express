import { Schema, model } from 'mongoose';
import { TrackerEvent } from '../tracker-service/tracker.interface';

const trackerEventSchema = new Schema<TrackerEvent>({
  event: { type: String, required: true },
  tags: { type: [String], required: true },
  url: { type: String, required: true },
  title: { type: String, required: true },
  ts: { type: Date, required: true },
});

export const TrackerEventModel = model<TrackerEvent>('TrackerEvent', trackerEventSchema);
