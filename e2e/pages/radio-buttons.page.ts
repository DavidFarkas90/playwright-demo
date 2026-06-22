import { type Locator, type Page } from "@playwright/test";
import { BasePage } from "./base.page.js";
import { RadioButtonsPageLabels } from "../constants/radio-buttons-page-labels.js";

/**
 * Page object for the Radio Buttons page.
 *
 * Demonstrates selecting radio inputs. Each radio's `id` equals its `value`
 * (e.g. `#black`, `#football`), so a single factory locator addresses any radio
 * in either group; it is exposed so tests can assert state with `toBeChecked()`.
 */
export class RadioButtonsPage extends BasePage {
  readonly pageTitle: Locator;
  readonly radio: (value: string) => Locator;

  constructor(page: Page) {
    super(page);
    this.pageTitle = page.locator(".page-layout h1", {
      hasText: RadioButtonsPageLabels.PAGE_TITLE,
    });
    this.radio = (value: string) => page.locator(`#${value}`);
  }

  /** Selects the radio input identified by its value (color or sport). */
  async select(value: string): Promise<void> {
    await this.radio(value).check();
  }
}
