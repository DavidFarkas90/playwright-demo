import { type Locator, type Page } from "@playwright/test";

export class HoverPage {
  readonly page: Page;
  readonly pageTitle: Locator;
  readonly userImage: (userId: number) => Locator;
  readonly userName: (userId: number) => Locator;
  readonly userProfileLink: (userId: number) => Locator;

  constructor(page: Page) {
    this.page = page;
    this.pageTitle = page.locator(".page-layout h1", {
      hasText: "Hovers page for Automation Testing Practice",
    });
    this.userImage = (userId: number) => page.getByTestId(`img-user-${userId}`);
    this.userName = (userId: number) => page.getByRole("heading", { name: `name: user${userId}` });
    this.userProfileLink = (userId: number) =>
      page.getByRole("link", { name: "View profile" }).nth(userId - 1);
  }

  async getPageTitle(): Promise<string> {
    return await this.pageTitle.innerText();
  }

  async hoverOverUserImage(userId: number) {
    await this.userImage(userId).hover();
  }

  async isUserNameVisible(userId: number): Promise<boolean> {
    return await this.userName(userId).isVisible();
  }

  async isUserProfileLinkVisible(userId: number): Promise<boolean> {
    return await this.userProfileLink(userId).isVisible();
  }

  async getUserName(userId: number): Promise<string> {
    return await this.userName(userId).innerText();
  }

  async getUserProfileLink(userId: number): Promise<string> {
    return (
      (await this.userProfileLink(userId).getAttribute("href")) || "User profile link not found"
    );
  }
}
