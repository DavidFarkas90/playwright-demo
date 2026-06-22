import { type Page, type Locator } from "@playwright/test";

/**
 * Shared base for every page object.
 *
 * Owns the framework-level `page` handle and the one query that every page
 * needs — reading its title. Each concrete page defines its own `pageTitle`
 * locator (the abstract member below), so the base stays page-agnostic.
 *
 * Keeps assertions and navigation out of page objects (see CLAUDE.md): this
 * class only exposes the `page` handle and a query method.
 */
export abstract class BasePage {
  readonly page: Page;

  /** Each page provides the locator that resolves to its main heading. */
  abstract readonly pageTitle: Locator;

  constructor(page: Page) {
    this.page = page;
  }

  /** Returns the visible text of the page's main heading. */
  async getPageTitle(): Promise<string> {
    return await this.pageTitle.innerText();
  }
}
