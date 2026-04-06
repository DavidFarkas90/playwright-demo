import { expect } from "@playwright/test";
import { test } from "../fixtures/user-fixture";
import { LoginPage } from "../pages/login-page";

const urlAfterlogin = "https://www.saucedemo.com/v1/inventory.html";

test("Open and verify login page", async ({ page, username, password }) => {
  const loginPage = new LoginPage(page);

  await loginPage.goToPage();
  await expect(page).toHaveTitle(/Swag Labs/);
  await loginPage.enterCredentials(username, password);
  await expect(page).toHaveURL(urlAfterlogin);
});
