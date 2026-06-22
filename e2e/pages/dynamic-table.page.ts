import { type Locator, type Page } from "@playwright/test";
import { BasePage } from "./base.page.js";
import { DynamicTablePageLabels } from "../constants/dynamic-table-page-labels.js";

/**
 * Page object for the Dynamic Table page.
 *
 * The table's cell values are randomized on every load, and a yellow label
 * (#chrome-cpu) echoes the current Chrome CPU value. The scenario reads a cell
 * by (row name, column name) — resolving the column index from the header so
 * it survives column reordering — and compares it to the label.
 */
export class DynamicTablePage extends BasePage {
  readonly pageTitle: Locator;
  readonly headerCells: Locator;
  readonly chromeCpuLabel: Locator;

  constructor(page: Page) {
    super(page);
    this.pageTitle = page.locator(".page-layout h1", {
      hasText: DynamicTablePageLabels.PAGE_TITLE,
    });
    this.headerCells = page.getByRole("columnheader");
    this.chromeCpuLabel = page.locator("#chrome-cpu");
  }

  /** Returns the text of the cell at the intersection of a row (by name) and a column (by header). */
  async getCellValue(rowName: string, columnName: string): Promise<string> {
    const headers = (await this.headerCells.allInnerTexts()).map((text) => text.trim());
    const columnIndex = headers.indexOf(columnName);
    const row = this.page.getByRole("row").filter({ hasText: rowName });
    return (await row.getByRole("cell").nth(columnIndex).innerText()).trim();
  }

  /**
   * Returns the Chrome CPU value shown in the yellow label.
   * Extracts the percentage with a regex because the label's text can be
   * polluted by injected ad content (e.g. "Chrome CPU: 5.9%...ad text").
   */
  async getExpectedChromeCpu(): Promise<string> {
    const labelText = await this.chromeCpuLabel.innerText();
    return labelText.match(/[\d.]+%/)![0];
  }
}
