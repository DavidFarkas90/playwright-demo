import { type Locator, type Page } from "@playwright/test";

export class CommitQualityDynamicLoadingPage {
  readonly page: Page;
  readonly alwaysVisibleButton: Locator;
  readonly loadingButton: Locator;
  readonly delayedButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.alwaysVisibleButton = page.getByRole("button", { name: "Always visible" });
    this.loadingButton = page.getByRole("button", { name: "loading" });
    this.delayedButton = page.getByRole("button", { name: "I am visible after 5 seconds" });
  }

  async clickAlwaysVisible(): Promise<void> {
    await this.alwaysVisibleButton.click();
  }
}
