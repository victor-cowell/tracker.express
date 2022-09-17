class TrackerI {
  constructor() {}
  async track(event: any, ...tags: string[]): Promise<void> {
    const trackerEvent: any = {
      event,
      tags,
      url: window.location.href,
      title: document.title,
      ts: new Date().toLocaleDateString(),
    };
    const response = await fetch("http://localhost:8001/track",{
      method: "POST",
      body: JSON.stringify([trackerEvent]),
      headers: { "Content-Type": "application/json" }
    })

    if (!response.ok) {
      throw new Error(`Request failed with status ${response.status}`)
    }
    console.log("Request successful!")
  }
}
const tracker = new TrackerI();
