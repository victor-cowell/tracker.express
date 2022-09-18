interface Tracker {
  track(event: string, ...tags: string[]): void;
}

interface TrackerEvent {
  event: TrackerEventType;
  tags: string[];
  url: string;
  title: string;
  ts: Date;
}

type TrackerEventType = 'page-view' | 'click-button' | 'click-link' | 'test';

class TrackerI implements Tracker {
  private eventsBuffer: TrackerEvent[] = [];
  private sendingEventsBuffer: TrackerEvent[] = [];
  private isDelayed: boolean = false;
  private readonly eventsLSKey = 'trackEvents';
  private readonly host: string;

  constructor() {
    this.host = this.getHost('1');
    this.initData();
    window.onbeforeunload = () => {
      this.onunload();
    };
    window.addEventListener('online', this.sendEventsWithDelay);
  }

  async track(event: any, ...tags: string[]): Promise<void> {
    this.addEventToBuffer(event, tags);
    await this.sendEventsWithDelay();
  }

  async sendEventsWithDelay(): Promise<void> {
    try {
      if (!this.eventsBuffer.length || this.eventsBuffer.length < 3 || this.isDelayed) {
        return;
      }
      this.isDelayed = true;
      await this.sendEvents();
      this.setDelay();
    } catch (e) {
      this.isDelayed = false;
      this.moveEventsToBuffer();
    }
  }

  async onunload(): Promise<void> {
    try {
      if (!this.eventsBuffer.length) {
        return;
      }
      await this.sendEvents();
    } catch (e) {
      this.moveEventsToBuffer();
      localStorage.setItem(this.eventsLSKey, JSON.stringify(this.eventsBuffer));
    }
  }

  private initData(): void {
    const lsEvents = localStorage.getItem(this.eventsLSKey);
    console.log(lsEvents);
    if (lsEvents) {
      const events = JSON.parse(lsEvents);
      this.eventsBuffer.push(...events);
      localStorage.removeItem(this.eventsLSKey);
    }
  }

  private async sendEvents(): Promise<void> {
    console.log('send events', this.eventsBuffer);
    this.setSendingBuffer();
    await this.sendEventsRequest();
  }

  private setDelay(): void {
    setTimeout(async () => {
      console.log('delay callback');
      if (this.eventsBuffer.length > 3) {
        this.isDelayed = false;
        console.log('Sending delayed events');
        return await this.sendEventsWithDelay();
      }
      this.isDelayed = false;
    }, 1000);
  }

  private addEventToBuffer(event: any, tags: string[]): void {
    const trackerEvent: any = {
      event,
      tags,
      url: window.location.href,
      title: document.title,
      ts: new Date().toISOString(),
    };
    console.log('adding event to buffer', trackerEvent);
    this.eventsBuffer.push(trackerEvent);
  }

  private sendEventsRequest(): Promise<Response> {
    return fetch(`${this.host}/track`, {
      method: 'POST',
      body: JSON.stringify(this.sendingEventsBuffer),
      headers: { 'Content-Type': 'application/json' },
    });
  }

  private setSendingBuffer(): void {
    this.sendingEventsBuffer = [...this.eventsBuffer];
    this.eventsBuffer = [];
  }

  private moveEventsToBuffer(): void {
    this.eventsBuffer.push(...this.sendingEventsBuffer);
    this.sendingEventsBuffer = [];
  }

  private getHost(apiPortNumber: string) {
    const { protocol, hostname, port } = window.location;
    const trackerPort = port.replace(/0$/, apiPortNumber);
    return `${protocol}//${hostname}:${trackerPort}`;
  }
}

const tracker = new TrackerI();
