import { type Locator, type Page } from "@playwright/test";

export class CartPage {

    readonly page: Page;
    readonly shoppingCartIcon: Locator;
    readonly removeButton: Locator;
    readonly checkoutButton: Locator;
    readonly continueShoppingButton: Locator;
    readonly cartItemTitle: Locator;
    readonly cartItemPrice: Locator;

    constructor(page: Page) {
        this.page = page;
        this.shoppingCartIcon = page.locator("#shopping_cart_container");
        this.removeButton = page.locator("button.btn_secondary cart_button");
        this.checkoutButton = page.locator(".btn_action checkout_button");
        this.continueShoppingButton = page.locator("a.btn_secondary");
        this.cartItemTitle = page.locator("div.inventory_item_name");
        this.cartItemPrice = page.locator("div.inventory_item_price");

    }

    async goToCart() {
        await this.shoppingCartIcon.click();
    }

    async removeProductFromCart() {
        await this.removeButton.click();
    }

    async goToCheckout() {
        await this.checkoutButton.click();
    }

    async continueShopping() {
        await this.continueShoppingButton.click();
    }

}