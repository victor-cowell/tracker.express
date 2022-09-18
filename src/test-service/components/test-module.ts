class TestModule {
  private readonly endpoint: string;
  constructor() {
    const host = this.getHost('2');
    this.endpoint = `${host}/events`;
  }
  async testTrackDelay(firstClicksCount: number, secondClicksCount: number): Promise<void> {
    this.repeatableClick(firstClicksCount);
    await new Promise(res => setTimeout(res, 100));
    this.repeatableClick(secondClicksCount);
  }

  getEvents(): void {
    this.sendRequest('GET')
      .then(async (data: Response) => console.log(await data.json()))
      .catch((e: any) => console.log(e));
  }

  deleteEvents(): void {
    this.sendRequest('DELETE')
      .then(() => console.log('Events were deleted.'))
      .catch((e: any) => console.log(e));
  }

  private clickOnButton(): void {
    const button = document.getElementById('click-me-button');
    if (!button) {
      throw Error(`Couldn't find button with click-me-button id`);
    }
    button.click();
  }

  private repeatableClick(times: number): void {
    for (let i = 0; i < times; i++) {
      this.clickOnButton();
    }
  }

  private sendRequest(method: 'GET' | 'DELETE'): Promise<Response> {
    return fetch(this.endpoint, {
      method,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  private getHost(apiPortNumber: string) {
    const { protocol, hostname, port } = window.location;
    const trackerPort = port.replace(/0$/, apiPortNumber);
    return `${protocol}//${hostname}:${trackerPort}`;
  }
}

const testModule = new TestModule();
// TODO we can add creating of buttons to this module and use this module on any template
