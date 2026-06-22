import { type Page, type Locator } from "@playwright/test";

/**
 * Shared base for every page object.
 *
 * Owns the framework-level `page` handle and the `pageTitle` locator that every
 * page exposes for a web-first load assertion (`await expect(pageTitle).toBeVisible()`).
 * Each concrete page defines its own `pageTitle` locator (the abstract member
 * below), so the base stays page-agnostic.
 *
 * Keeps assertions and navigation out of page objects (see CLAUDE.md): this
 * class only exposes the `page` handle and locators.
 */
export abstract class BasePage {
  readonly page: Page;

  /** Each page provides the locator that resolves to its main heading. */
  abstract readonly pageTitle: Locator;

  constructor(page: Page) {
    this.page = page;
  }
}
