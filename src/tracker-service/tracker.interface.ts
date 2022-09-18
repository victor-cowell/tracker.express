export interface TrackerEvent {
  event: TrackerEventType;
  tags: string[];
  url: string;
  title: string;
  ts: Date;
}

export type TrackerEventType = 'page-view' | 'click-button' | 'click-link' | 'test';
