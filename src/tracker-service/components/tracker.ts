class Tracker {
  eventsBuffer: any[] = [];
  isDelayed: boolean = false;

  track(event: any, ...tags: string[]): Promise<void> | void {
    this.addEventToBuffer(event, tags);
    console.log(this.isDelayed);
    console.log(this.eventsBuffer);
    if (this.eventsBuffer.length < 3 || this.isDelayed) {
      return;
    }
    this.isDelayed = true;
    return this.sendEvents();
  }

  async sendEvents(): Promise<void> {
    if (!this.eventsBuffer.length) {
      return;
    }
    const events = [...this.eventsBuffer];
    this.eventsBuffer = [];
    await this.sendEventsRequest(events);
    setInterval(() => {
      if (this.eventsBuffer.length && this.isDelayed) {
        console.log('Sending delayed events');
        console.log(this.eventsBuffer);
        this.sendEvents();
        return;
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
    this.eventsBuffer.push(trackerEvent);
  }

  private async sendEventsRequest(events: any[]) {
    await fetch('http://localhost:8001/track', {
      method: 'POST',
      body: JSON.stringify(events),
      headers: { 'Content-Type': 'application/json' }
    });
  }
}

const tracker = new Tracker();
// TODO if we get error we couldn't save events anywhere. need to check how we can change it
window.onbeforeunload = ()=> {
  window.onbeforeunload = null;
  tracker.sendEvents.apply(tracker);
}
