import { test, expect } from "@playwright/test";
import { LoginPage } from "../pages/login-page";
import { ProductsPage } from "../pages/products-page";
import { CartPage } from "../pages/cart-page";
import { STANDARD_USER } from "../fixtures/users";
import { PRODUCTS } from "../fixtures/products";
import { STATUS_CODES } from "http";

const urlAfterlogin = "https://www.saucedemo.com/v1/inventory.html";
const productTitle = PRODUCTS.sauceLabBoltsShirt.name;

test.beforeEach(async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.loginUser(STANDARD_USER.username, STANDARD_USER.password);
    await expect(page).toHaveURL(urlAfterlogin);
    const productsPage = new ProductsPage(page);
    await productsPage.addProductToCart(2);

  });

test("Validate cart contents", async ({ page }) => {
    const cartPage = new CartPage(page);

    const [response] = await Promise.all([
      page.waitForResponse("https://www.saucedemo.com/v1/cart.html"),
      cartPage.goToCart()
      
    ]);
    const itemTitle =  await cartPage.cartItemTitle.innerText();
    await expect(productTitle).toEqual(itemTitle);
    
});
