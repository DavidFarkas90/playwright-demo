import { type Locator, type Page } from "@playwright/test";
import { BasePage } from "./base.page.js";
import { AddRemoveElementsPageLabels } from "../constants/add-remove-elements-page-labels.js";

/**
 * Page object for the Add/Remove Elements page.
 *
 * Clicking "Add Element" appends a "Delete" button to the page; clicking a
 * "Delete" button removes it. Demonstrates working with a dynamic collection
 * of elements: the `deleteButtons` collection locator is exposed so tests can
 * make web-first count assertions (`toHaveCount()`).
 */
export class AddRemoveElementsPage extends BasePage {
  readonly pageTitle: Locator;
  readonly addElementButton: Locator;
  readonly deleteButtons: Locator;

  constructor(page: Page) {
    super(page);
    this.pageTitle = page.locator(".page-layout h1", {
      hasText: AddRemoveElementsPageLabels.PAGE_TITLE,
    });
    this.addElementButton = page.getByRole("button", {
      name: AddRemoveElementsPageLabels.ADD_BUTTON,
    });
    // Collection locator — resolves to every "Delete" button currently present.
    this.deleteButtons = page.getByRole("button", {
      name: AddRemoveElementsPageLabels.DELETE_BUTTON,
    });
  }

  /** Clicks "Add Element" the given number of times. */
  async addElements(count: number): Promise<void> {
    for (let i = 0; i < count; i++) {
      await this.addElementButton.click();
    }
  }

  /** Deletes the delete-button at the given 0-based index. */
  async deleteElementAt(index: number): Promise<void> {
    await this.deleteButtons.nth(index).click();
  }
}
