import { type Locator, type Page } from "@playwright/test";

export class DragAndDropPage {
  readonly page: Page;
  readonly smallBox: Locator;
  readonly largeBox: Locator;
  readonly dropTarget: Locator;

  constructor(page: Page) {
    this.page = page;
    this.smallBox = page.locator("#small-box");
    this.largeBox = page.locator(".large-box");
    this.dropTarget = page.locator(".inside");
  }

  async dragSmallBoxToLargeBox(): Promise<void> {
    await this.smallBox.dragTo(this.largeBox);
  }

  async getDropTargetText(): Promise<string> {
    return await this.dropTarget.innerText();
  }
}
