import { type Locator, type Page } from "@playwright/test";
import { BasePage } from "./base.page.js";
import { HoverPageLabels } from "../constants/hover-page-labels.js";

export class HoverPage extends BasePage {
  readonly pageTitle: Locator;
  readonly userImage: (userId: number) => Locator;
  readonly userName: (userId: number) => Locator;
  readonly userProfileLink: (userId: number) => Locator;

  constructor(page: Page) {
    super(page);
    this.pageTitle = page.locator(".page-layout h1", {
      hasText: HoverPageLabels.PAGE_TITLE,
    });
    this.userImage = (userId: number) => page.getByTestId(`img-user-${userId}`);
    this.userName = (userId: number) =>
      page.getByRole("heading", { name: HoverPageLabels.USER_NAME(userId) });
    this.userProfileLink = (userId: number) =>
      page.getByRole("link", { name: "View profile" }).nth(userId - 1);
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
