import { type Locator, type Page } from "@playwright/test";
import { BasePage } from "./base.page.js";
import { TooltipsPageLabels } from "../constants/tooltips-page-labels.js";

/**
 * Page object for the Tooltips page.
 *
 * Demonstrates hover interactions and asserting on a transiently-rendered
 * element. The buttons use Bootstrap tooltips: hovering a trigger renders a
 * single element with `role="tooltip"`, which the test asserts against.
 */
export class TooltipsPage extends BasePage {
  readonly pageTitle: Locator;
  readonly trigger: (index: number) => Locator;
  /** The tooltip rendered on hover (exposed for web-first assertions). */
  readonly tooltip: Locator;

  constructor(page: Page) {
    super(page);
    this.pageTitle = page.locator(".page-layout h1", { hasText: TooltipsPageLabels.PAGE_TITLE });
    this.trigger = (index: number) => page.locator(`#btn${index}`);
    this.tooltip = page.getByRole("tooltip");
  }

  /** Hovers the tooltip trigger button at the given 1-based index. */
  async hoverTrigger(index: number): Promise<void> {
    await this.trigger(index).hover();
  }
}
