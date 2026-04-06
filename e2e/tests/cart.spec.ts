import { expect } from "@playwright/test";
import { test } from "../fixtures/user-fixture";
import { LoginPage } from "../pages/login-page";
import { ProductsPage } from "../pages/products-page";
import { CartPage } from "../pages/cart-page";
import { PRODUCTS } from "../fixtures/products";

const urlAfterlogin = "https://www.saucedemo.com/v1/inventory.html";
const productTitle = PRODUCTS.sauceLabBoltsShirt.name;

test.beforeEach(async ({ page, username, password }) => {
  const loginPage = new LoginPage(page);
  await loginPage.loginUser(username, password);
  await expect(page).toHaveURL(urlAfterlogin);
  const productsPage = new ProductsPage(page);
  await productsPage.addProductToCart(2);
});

test("Validate cart contents", async ({ page }) => {
  const cartPage = new CartPage(page);

  await page.waitForResponse("https://www.saucedemo.com/v1/cart.html");
  await cartPage.goToCart();

  const itemTitle = await cartPage.cartItemTitle.innerText();
  expect(productTitle).toEqual(itemTitle);
});
