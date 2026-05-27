import { expect, test } from "@playwright/test";
import { HoverPage } from "../../pages/hover.page.js";
import { PageUrls } from "../../constants/page-urls.js";
import { HoverPageLabels } from "../../constants/hover-page-labels.js";

let hoverPage: HoverPage;
let userName: string;
const USER_COUNT: number = 3;

test.describe("Hover page tests", () => {
  test.beforeEach(async ({ page }) => {
    hoverPage = new HoverPage(page);
    await page.goto(PageUrls.HOVER_PAGE);
  });

  test("Hover over user images and verify user names are displayed", async () => {
    await test.step("Verify the page title is correct", async () => {
      const pageTitle = await hoverPage.getPageTitle();
      expect(pageTitle).toBe(HoverPageLabels.PAGE_TITLE);
    });

    await test.step("Hover over the images and verify user name is displayed", async () => {
      for (let userId = 1; userId <= USER_COUNT; userId++) {
        await hoverPage.hoverOverUserImage(userId);
        userName = await hoverPage.getUserName(userId);
        expect(await hoverPage.isUserNameVisible(userId)).toBeTruthy();
        expect(userName, `User name for user${userId} is correct`).toBe(
          HoverPageLabels.USER_NAME(userId),
        );
      }
    });
  });

  test("Hover over user image and click on profile link, and verify user profile page is displayed", async () => {
    await test.step("Hover over the first user image and verify profile link", async () => {
      const userId = 1;
      await hoverPage.hoverOverUserImage(userId);
      expect(await hoverPage.isUserProfileLinkVisible(userId)).toBeTruthy();
      expect(await hoverPage.getUserProfileLink(userId)).toContain(`/users/${userId}`);
    });
  });
});
