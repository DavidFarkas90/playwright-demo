import { expect } from "@playwright/test";
import { test } from "../fixtures/user-fixture";
import { LoginPage } from "../pages/login-page";
import { ProductsPage } from "../pages/products-page";

const urlAfterlogin = "https://www.saucedemo.com/v1/inventory.html";
const productUrl = "https://www.saucedemo.com/v1/inventory-item.html?id=1";

test.beforeEach(async ({ page, username, password }) => {
    const loginPage = new LoginPage(page);
    await loginPage.loginUser(username, password);
    await expect(page).toHaveURL(urlAfterlogin);
});

test("Add product to cart", async ({ page }) => {
    const productsPage = new ProductsPage(page);

    await productsPage.addProductToCart(2);

    const removeButton = await productsPage.removeProduct;
    expect(removeButton).toBeVisible();
    expect(removeButton).toHaveCount(1);

});

test("Select a product", async ({ page }) => {

    const productsPage = new ProductsPage(page);

    await productsPage.selectProduct("Sauce Labs Bolt T-Shirt");
    await expect(page).toHaveURL(productUrl);

});