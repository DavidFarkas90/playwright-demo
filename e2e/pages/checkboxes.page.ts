import { type Locator, type Page } from "@playwright/test";
import { BasePage } from "./base.page.js";
import { CheckboxesPageLabels } from "../constants/checkboxes-page-labels.js";

/**
 * Page object for the Checkboxes page.
 *
 * Demonstrates `check()`/`uncheck()` (which are idempotent and assert the
 * resulting state for you). The two checkboxes are addressed by their 1-based
 * index (`#checkbox1`, `#checkbox2`); the `checkbox` locator factory is exposed
 * so tests can make web-first assertions (`toBeChecked()`) against them.
 */
export class CheckboxesPage extends BasePage {
  readonly pageTitle: Locator;
  readonly checkbox: (index: number) => Locator;

  constructor(page: Page) {
    super(page);
    this.pageTitle = page.locator(".page-layout h1", { hasText: CheckboxesPageLabels.PAGE_TITLE });
    this.checkbox = (index: number) => page.locator(`#checkbox${index}`);
  }

  /** Ticks the checkbox at the given 1-based index (no-op if already checked). */
  async checkBox(index: number): Promise<void> {
    await this.checkbox(index).check();
  }

  /** Unticks the checkbox at the given 1-based index (no-op if already unchecked). */
  async uncheckBox(index: number): Promise<void> {
    await this.checkbox(index).uncheck();
  }
}
