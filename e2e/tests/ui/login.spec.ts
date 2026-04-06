import { test, expect } from "@playwright/test";
import { LoginPage } from "../../pages/login.page.js";

const URL = "https://practice.expandtesting.com/login";
const ERROR_MESSAGE = "Your username is invalid!";
let loginPage: LoginPage;

test.beforeEach(async ({ page }) => {
  await page.goto(URL);
  loginPage = new LoginPage(page);
});

test("Try login with invalid credentials", async () => {
  await test.step("Enter empty username and password, click login and verify error message", async () => {
    await loginPage.enterUsername("");
    await loginPage.enterPassword("");
    await loginPage.clickLoginButton();

    const errorMessage = await loginPage.getErrorMessage();
    expect(loginPage.isAlertVisible()).toBeTruthy();
    expect(errorMessage, "Error message is correct").toEqual(ERROR_MESSAGE);
  });
});
