import { type Locator, type Page } from "@playwright/test";
import { BasePage } from "./base.page.js";
import { SecurePageLabels } from "../constants/secure-page-labels.js";

/**
 * Page object for the Secure Area page — the page reached after a successful
 * login. Used to verify that reused authentication state (storageState) grants
 * access without going through the login flow again.
 */
export class SecurePage extends BasePage {
  readonly pageTitle: Locator;
  readonly logoutButton: Locator;

  constructor(page: Page) {
    super(page);
    this.pageTitle = page.locator(".page-layout h1", { hasText: SecurePageLabels.PAGE_TITLE });
    this.logoutButton = page.getByRole("link", { name: "Logout" });
  }
}
