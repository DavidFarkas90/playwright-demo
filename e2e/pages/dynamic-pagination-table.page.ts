import { type Locator, type Page } from "@playwright/test";
import { BasePage } from "./base.page.js";
import { DynamicPaginationTablePageLabels } from "../constants/dynamic-pagination-table-page-labels.js";

/**
 * Page object for the Dynamic Pagination Table page.
 *
 * Demonstrates richer table interactions: client-side search/filtering,
 * changing page size via a `<select>`, and navigating pages. Collection and
 * cell locators are exposed so tests can use web-first assertions
 * (`toHaveCount`, `toHaveText`).
 */
export class DynamicPaginationTablePage extends BasePage {
  readonly pageTitle: Locator;
  readonly searchInput: Locator;
  readonly pageSizeSelect: Locator;
  /** The data rows currently rendered in the table body. */
  readonly dataRows: Locator;
  /** First cell (student name) of the first data row. */
  readonly firstStudentName: Locator;

  constructor(page: Page) {
    super(page);
    this.pageTitle = page.locator(".page-layout h1", {
      hasText: DynamicPaginationTablePageLabels.PAGE_TITLE,
    });
    this.searchInput = page.getByRole("searchbox");
    this.pageSizeSelect = page.getByRole("combobox");
    this.dataRows = page.locator("tbody").getByRole("row");
    this.firstStudentName = page.locator("tbody tr").first().getByRole("cell").first();
  }

  /** Filters the table by the given search term. */
  async search(term: string): Promise<void> {
    await this.searchInput.fill(term);
  }

  /** Selects the number of rows shown per page (e.g. "5", or "-1" for all). */
  async selectPageSize(value: string): Promise<void> {
    await this.pageSizeSelect.selectOption(value);
  }

  /** Navigates to the given page number via the pagination control. */
  async goToPage(pageNumber: number): Promise<void> {
    await this.page.getByRole("link", { name: String(pageNumber), exact: true }).click();
  }
}
