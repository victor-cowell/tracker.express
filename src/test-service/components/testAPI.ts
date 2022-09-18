import { Request, Response } from 'express';
import { TrackerEventModel } from '../../models/trackerEvent';

export const deleteEvents = async (req: Request, res: Response) => {
  const deleteResult = await TrackerEventModel.collection.deleteMany({});
  console.log(deleteResult);
  res.status(200);
  res.send();
};

export const getEvents = async (req: Request, res: Response) => {
  const events = await TrackerEventModel.find({});
  res.status(200);
  res.send(events);
};
