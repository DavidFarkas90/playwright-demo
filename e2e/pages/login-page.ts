import { expect, type Locator, type Page } from "@playwright/test";

export class LoginPage {
    readonly page: Page;
    readonly usernameInput: Locator;
    readonly passwordInput: Locator;
    readonly loginButton: Locator;

    constructor(page: Page) {
        this.page = page;
        this.usernameInput = page.locator("[data-test='username']");
        this.passwordInput = page.locator("[data-test='password']");
        this.loginButton = page.locator("#login-button");
    }

    async goToPage() {
        await this.page.goto("https://www.saucedemo.com/v1/");
    }

    async enterUsername(username: string) {
        await this.usernameInput.fill(username);
        expect(this.usernameInput).toHaveValue(username);
    }

    async enterPassword(password: string) {
        await this.passwordInput.fill(password);
        expect(this.passwordInput).toHaveValue(password);
    }

    async clickOnLogin() {
        await this.loginButton.click();
    }

    async enterCredentials(username: string, password: string) {

        await this.enterUsername(username);
        await this.enterPassword(password);
        await this.clickOnLogin();

    }

    async loginUser(username: string, password: string) {
        await this.goToPage();
        await this.enterCredentials(username, password);

    }

}

