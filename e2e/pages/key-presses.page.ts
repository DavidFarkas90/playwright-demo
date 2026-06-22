import { type Locator, type Page } from "@playwright/test";
import { BasePage } from "./base.page.js";
import { KeyPressesPageLabels } from "../constants/key-presses-page-labels.js";

/**
 * Page object for the Key Presses page.
 *
 * Demonstrates keyboard input via `locator.press()` and reading the resulting
 * text the page echoes back into the result element.
 */
export class KeyPressesPage extends BasePage {
  readonly pageTitle: Locator;
  readonly target: Locator;
  /** The element that echoes the last key pressed (exposed for assertions). */
  readonly result: Locator;

  constructor(page: Page) {
    super(page);
    this.pageTitle = page.locator(".page-layout h1", { hasText: KeyPressesPageLabels.PAGE_TITLE });
    this.target = page.locator("#target");
    this.result = page.locator("#result");
  }

  /** Presses a single key while the target input is focused. */
  async pressKey(key: string): Promise<void> {
    await this.target.press(key);
  }
}
