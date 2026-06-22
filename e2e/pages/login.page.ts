import { type Page, type Locator } from "@playwright/test";
import { BasePage } from "./base.page.js";
import { LoginPageLabels } from "../constants/login-page-labels.js";

export class LoginPage extends BasePage {
  readonly pageTitle: Locator;
  readonly usernameInput: Locator;
  readonly passwordInput: Locator;
  readonly loginButton: Locator;
  readonly logoutButton: Locator;
  readonly alert: Locator;
  readonly alertMessage: Locator;

  constructor(page: Page) {
    super(page);
    this.pageTitle = page.locator(".container h1", {
      hasText: LoginPageLabels.PAGE_TITLE,
    });
    this.usernameInput = page.getByRole("textbox", { name: "username" });
    this.passwordInput = page.getByRole("textbox", { name: "password" });
    this.loginButton = page.getByRole("button", { name: "Login" });
    this.logoutButton = page.getByRole("link", { name: "Logout" });
    this.alert = page.locator("#flash");
    this.alertMessage = page.locator("#flash b");
  }

  async enterUsername(username: string) {
    await this.usernameInput.fill(username);
  }

  async enterPassword(password: string) {
    await this.passwordInput.fill(password);
  }

  async clickLoginButton() {
    await this.loginButton.click();
  }

  async clickLogoutButton() {
    await this.logoutButton.click();
  }

  async login(username: string, password: string) {
    await this.enterUsername(username);
    await this.enterPassword(password);
    await this.clickLoginButton();
  }
}
