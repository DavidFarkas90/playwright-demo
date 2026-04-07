import { test, expect } from "@playwright/test";
import { LoginPage } from "../../pages/login.page.js";
import { PageUrls } from "../../constants/page-urls.js";
import { LoginPageLabels } from "../../constants/login-page-labels.js";

const USERNAME = process.env.EXPAND_TESTING_USERNAME ?? "username-not-set";
const PASSWORD = process.env.EXPAND_TESTING_PASSWORD ?? "password-not-set";
let loginPage: LoginPage;

test.beforeEach(async ({ page }) => {
  await page.goto(PageUrls.LOGIN_PAGE);
  loginPage = new LoginPage(page);
});

test("Try login with invalid credentials", async () => {
  await test.step("Enter empty username and password, click login and verify error message", async () => {
    await loginPage.enterUsername("");
    await loginPage.enterPassword("");
    await loginPage.clickLoginButton();

    const errorMessage = await loginPage.getAlertMessage();
    expect(loginPage.isAlertVisible()).toBeTruthy();
    expect(errorMessage, LoginPageLabels.VALIDATION_MESSAGE_IS_CORRECT).toEqual(
      LoginPageLabels.YOUR_USERNAME_IS_INVALID,
    );
  });
});

test("Login with valid credentials", async () => {
  await loginPage.login(USERNAME, PASSWORD);

  const loggedInMessage = await loginPage.getAlertMessage();
  expect(loginPage.isAlertVisible()).toBeTruthy();
  expect(loggedInMessage, LoginPageLabels.VALIDATION_MESSAGE_IS_CORRECT).toEqual(
    LoginPageLabels.YOU_LOGGED_INTO_A_SECURE_AREA,
  );
});
