
export interface TrackerEventBody {
  "event": TrackerEventType,
  "tags": string[],
  "url": string,
  "title": string,
  // TODO need to recheck how it works with database
  "ts": string;
}

export type TrackerEventType = 'page-view' | 'click-button' | 'click-link' | 'test';
