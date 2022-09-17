class TrackerI {
  constructor() {}

  track(event: any, ...tags: string[]): void {
    const trackerEvent: any = {
      event,
      tags,
      url: window.location.href,
      title: document.title,
      // TODO need to recheck how it works with database
      ts: new Date().toLocaleDateString(),
    };
    console.log(trackerEvent);
  }
}
const tracker = new TrackerI();
