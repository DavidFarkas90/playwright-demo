import { type Locator, type Page } from "@playwright/test";
import { BasePage } from "./base.page.js";
import { DropdownPageLabels } from "../constants/dropdown-page-labels.js";

/**
 * Page object for the Dropdown List page.
 *
 * Demonstrates Playwright's `selectOption` API and reading the currently
 * selected option back out of a native `<select>`.
 */
export class DropdownPage extends BasePage {
  readonly pageTitle: Locator;
  readonly dropdown: Locator;
  /** The `<option>` currently selected inside the dropdown. */
  readonly selectedOption: Locator;

  constructor(page: Page) {
    super(page);
    this.pageTitle = page.locator(".page-layout h1", { hasText: DropdownPageLabels.PAGE_TITLE });
    // The main practice dropdown has a stable id; sibling selects (country,
    // elements-per-page) make a role-based locator ambiguous, so we target #dropdown.
    this.dropdown = page.locator("#dropdown");
    this.selectedOption = this.dropdown.locator("option:checked");
  }

  /** Selects an option by its visible label (e.g. "Option 2"). */
  async selectOptionByLabel(label: string): Promise<void> {
    await this.dropdown.selectOption({ label });
  }

  /** Returns the visible label of the currently selected option. */
  async getSelectedOption(): Promise<string> {
    return await this.selectedOption.innerText();
  }
}
