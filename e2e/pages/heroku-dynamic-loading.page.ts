import { type Locator, type Page } from "@playwright/test";

export class HerokuDynamicLoadingPage {
  readonly page: Page;
  readonly startButton: Locator;
  readonly loadingSpinner: Locator;
  readonly helloWorldHeading: Locator;

  constructor(page: Page) {
    this.page = page;
    this.startButton = page.getByRole("button", { name: "Start" });
    this.loadingSpinner = page.locator("#loading").getByRole("img");
    this.helloWorldHeading = page.getByRole("heading", { name: "Hello World!" });
  }

  async clickStart(): Promise<void> {
    await this.startButton.click();
  }
}
