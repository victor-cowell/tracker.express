class Tracker {
  private eventsBuffer: any[] = [];
  private sendingEventsBuffer: any[] = [];
  private isDelayed: boolean = false;
  private readonly eventsLSKey = 'trackEvents';

  constructor() {
    this.initData();
    window.onunload = this.onunload;
    window.addEventListener('online', this.sendEventsWithDelay);
  }

  async track(event: any, ...tags: string[]): Promise<void> {
    this.addEventToBuffer(event, tags);
    await this.sendEventsWithDelay();
  }

  async sendEventsWithDelay() {
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

  async onunload() {
    try {
      await this.sendEvents();
    } catch (e) {
      this.moveEventsToBuffer();
      localStorage.setItem(this.eventsLSKey, JSON.stringify(this.eventsBuffer));
    }
  }

  private initData() {
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

  private setDelay() {
    setTimeout( async () => {
      console.log('delay callback')
      if (this.eventsBuffer.length > 3) {
        this.isDelayed = false;
        console.log('Sending delayed events');
        return await this.sendEventsWithDelay();
      }
      this.isDelayed = false;
    }, 1000);
  }

  private addEventToBuffer(event: any, tags: string[]) {
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
    return fetch('http://localhost:8001/track', {
      method: 'POST',
      body: JSON.stringify(this.sendingEventsBuffer),
      headers: { 'Content-Type': 'application/json' }
    });
  }

  private setSendingBuffer() {
    this.sendingEventsBuffer = [...this.eventsBuffer];
    this.eventsBuffer = [];
  }

  private moveEventsToBuffer() {
    this.eventsBuffer.push(...this.sendingEventsBuffer);
    this.sendingEventsBuffer = [];
  }
}

const tracker = new Tracker();
