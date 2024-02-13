import { test, expect } from "@playwright/test";
import { LoginPage } from "../pages/login-page";
import { ProductsPage } from "../pages/products-page";
import { STANDARD_USER } from "../fixtures/users";

const urlAfterlogin = "https://www.saucedemo.com/v1/inventory.html";
const productUrl = "https://www.saucedemo.com/v1/inventory-item.html?id=1";

test.beforeEach(async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.loginUser(STANDARD_USER.username, STANDARD_USER.password);
    await expect(page).toHaveURL(urlAfterlogin);
  });

test("Add product to cart", async ({ page }) => {
    const productsPage = new ProductsPage(page);

    //await productsPage.selectProduct(2);

    await productsPage.addProductToCart(2);

    const removeButton = await productsPage.removeProduct;
    expect(removeButton).toBeVisible();
    expect(removeButton).toHaveCount(1);

    //await expect(removeButton).toEqual("Remove");

    //await expect(page).toHaveURL(productUrl);


    // const request = await page.waitForRequest("https://www.saucedemo.com/v1/inventory-item.html?id=1", {
    //     timeout: 5000
    //   });



    // const response = await page.waitForResponse('https://example.com/some-endpoint', {
    //     timeout: 3000 // optional timeout in milliseconds
    //   });
    
});

test("Select a product", async ({ page }) => {

    const productsPage = new ProductsPage(page);

    await productsPage.selectProduct("Sauce Labs Bolt T-Shirt");
    await expect(page).toHaveURL(productUrl);


    // const request = await page.waitForRequest("https://www.saucedemo.com/v1/inventory-item.html?id=1", {
    //     timeout: 5000
    //   });



    // const response = await page.waitForResponse('https://example.com/some-endpoint', {
    //     timeout: 3000 // optional timeout in milliseconds
    //   });
    
});