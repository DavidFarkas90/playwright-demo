import { test, expect } from "@playwright/test";
import { LoginPage } from "../pages/login-page";
import { STANDARD_USER } from "../fixtures/users";

const urlAfterlogin = "https://www.saucedemo.com/v1/inventory.html";

test("Open and verify login page", async ({ page }) => {

    const loginPage = new LoginPage(page);

    await loginPage.goToPage();
    await expect(page).toHaveTitle(/Swag Labs/);
    await loginPage.enterCredentials(STANDARD_USER.username, STANDARD_USER.password);
    await expect(page).toHaveURL(urlAfterlogin);
    
});
