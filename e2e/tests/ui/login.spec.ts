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

  test("Try login with valid username and invalid password", async () => {
    await test.step("Enter valid username and invalid password, click login and verify error message", async () => {
      await loginPage.enterUsername(USERNAME);
      await loginPage.enterPassword(INVALID_PASSWORD);
      await loginPage.clickLoginButton();

      const errorMessage = await loginPage.getAlertMessage();
      expect(loginPage.isAlertVisible()).toBeTruthy();
      expect(errorMessage, LoginPageLabels.VALIDATION_MESSAGE_IS_CORRECT).toEqual(
        LoginPageLabels.YOUR_PASSWORD_IS_INVALID,
      );
    });
  });

  test("Login with valid credentials", async () => {
    await test.step("Enter valid username and password, click login and verify success message", async () => {
      await loginPage.login(USERNAME, PASSWORD);

      const loggedInMessage = await loginPage.getAlertMessage();
      expect(loginPage.isAlertVisible()).toBeTruthy();
      expect(loggedInMessage, LoginPageLabels.VALIDATION_MESSAGE_IS_CORRECT).toEqual(
        LoginPageLabels.YOU_LOGGED_INTO_A_SECURE_AREA,
      );
    });
  });

  test("Logout after successful login", async () => {
    await test.step("Login with valid credentials, click logout and verify login page is displayed", async () => {
      await loginPage.login(USERNAME, PASSWORD);
      await loginPage.logoutButton.isVisible();
      await loginPage.clickLogoutButton();

      const loggedOutMessage = await loginPage.getAlertMessage();
      expect(loggedOutMessage).toEqual(LoginPageLabels.YOU_ARE_LOGGED_OUT_OF_THE_SECURE_AREA);
    });
  });
});
