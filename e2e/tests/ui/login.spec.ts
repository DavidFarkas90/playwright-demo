import { test, expect } from "@playwright/test";
import { LoginPage } from "../../pages/login.page.js";
import { PageUrls } from "../../constants/page-urls.js";
import { LoginPageLabels } from "../../constants/login-page-labels.js";

const USERNAME: string = process.env.EXPAND_TESTING_USERNAME ?? "username-not-set";
const PASSWORD: string = process.env.EXPAND_TESTING_PASSWORD ?? "password-not-set";
const INVALID_PASSWORD: string = "invalid-password";
let loginPage: LoginPage;

test.describe("Login page tests", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(PageUrls.LOGIN_PAGE());
    loginPage = new LoginPage(page);
  });

  test("Try login with invalid credentials", async () => {
    await test.step("Submit login form with empty username and password", async () => {
      await loginPage.enterUsername("");
      await loginPage.enterPassword("");
      await loginPage.clickLoginButton();
    });

    await test.step("Verify username validation error is displayed", async () => {
      const errorMessage = await loginPage.getAlertMessage();
      expect(await loginPage.isAlertVisible()).toBeTruthy();
      expect(errorMessage, LoginPageLabels.VALIDATION_MESSAGE_IS_CORRECT).toEqual(
        LoginPageLabels.YOUR_USERNAME_IS_INVALID,
      );
    });
  });

  test("Try login with valid username and invalid password", async () => {
    await test.step("Submit login form with valid username and invalid password", async () => {
      await loginPage.enterUsername(USERNAME);
      await loginPage.enterPassword(INVALID_PASSWORD);
      await loginPage.clickLoginButton();
    });

    await test.step("Verify password validation error is displayed", async () => {
      const errorMessage = await loginPage.getAlertMessage();
      expect(await loginPage.isAlertVisible()).toBeTruthy();
      expect(errorMessage, LoginPageLabels.VALIDATION_MESSAGE_IS_CORRECT).toEqual(
        LoginPageLabels.YOUR_PASSWORD_IS_INVALID,
      );
    });
  });

  test("Login with valid credentials", async () => {
    await test.step("Submit login form with valid credentials", async () => {
      await loginPage.login(USERNAME, PASSWORD);
    });

    await test.step("Verify secure area success message is displayed", async () => {
      const loggedInMessage = await loginPage.getAlertMessage();
      expect(await loginPage.isAlertVisible()).toBeTruthy();
      expect(loggedInMessage, LoginPageLabels.VALIDATION_MESSAGE_IS_CORRECT).toEqual(
        LoginPageLabels.YOU_LOGGED_INTO_A_SECURE_AREA,
      );
    });
  });

  test("Logout after successful login", async () => {
    await test.step("Log in with valid credentials and click logout", async () => {
      await loginPage.login(USERNAME, PASSWORD);
      await expect(loginPage.alert).toBeVisible();
      await loginPage.clickLogoutButton();
    });

    await test.step("Verify logout confirmation message is displayed", async () => {
      const loggedOutMessage = await loginPage.getAlertMessage();
      expect(loggedOutMessage).toEqual(LoginPageLabels.YOU_ARE_LOGGED_OUT_OF_THE_SECURE_AREA);
    });
  });
});
