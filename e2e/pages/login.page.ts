import { type Page, type Locator } from "@playwright/test";
import { LoginPageLabels } from "../constants/login-page-labels.js";

export class LoginPage {
  readonly page: Page;
  readonly usernameInput: Locator;
  readonly passwordInput: Locator;
  readonly loginButton: Locator;
  readonly logoutButton: Locator;
  readonly pageTitle: Locator;
  readonly alert: Locator;
  readonly alertMessage: Locator;

  constructor(page: Page) {
    this.page = page;
    this.usernameInput = page.getByRole("textbox", { name: "username" });
    this.passwordInput = page.getByRole("textbox", { name: "password" });
    this.loginButton = page.getByRole("button", { name: "Login" });
    this.logoutButton = page.getByRole("link", { name: "Logout" });
    this.pageTitle = page.locator(".container h1", {
      hasText: LoginPageLabels.PAGE_TITLE,
    });
    this.alert = page.locator("#flash");
    this.alertMessage = page.locator("#flash b");
  }

  async getPageTitle(): Promise<string> {
    return await this.pageTitle.innerText();
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

  async isAlertVisible(): Promise<boolean> {
    return await this.alert.isVisible();
  }

  async getAlertMessage(): Promise<string> {
    return await this.alertMessage.innerText();
  }
}
