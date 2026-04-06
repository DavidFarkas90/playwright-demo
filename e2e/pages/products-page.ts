import { type Locator, type Page } from "@playwright/test";

export class ProductsPage {
  readonly page: Page;
  readonly sorting: Locator;
  readonly inventoryItem: Locator;
  readonly inventoryItemImage: Locator;
  readonly inventoryItemTitle: Locator;
  readonly inventryItemPrice: Locator;
  readonly addToCartButton: Locator;
  readonly removeProduct: Locator;

  constructor(page: Page) {
    this.page = page;
    this.sorting = page.locator("select.product_sort_container");
    this.inventoryItem = page.locator(".inventory_item");
    this.inventoryItemImage = page.locator("img.inventory_item_img");
    this.inventoryItemTitle = page.locator("div.inventory_item_name");
    this.inventryItemPrice = page.locator("div.inventory_item_price");
    this.addToCartButton = page.getByRole("button", { name: /ADD TO CART/i });
    this.removeProduct = page.getByRole("button", { name: /REMOVE/i });
  }

  async selectProduct(product: string) {
    await this.inventoryItemTitle.getByText(product).click();
  }

  async addProductToCart(product: number) {
    await this.addToCartButton.nth(product).click();
  }
}
