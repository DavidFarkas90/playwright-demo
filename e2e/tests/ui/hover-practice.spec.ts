import { test, expect } from "../../fixtures/pages.fixture.js";
import { HoverPageLabels } from "../../constants/hover-page-labels.js";

const USER_COUNT: number = 3;

test.describe("Hover page tests", () => {
  test("Hover over user images and verify user names are displayed", async ({ hoverPage }) => {
    await test.step("Verify the page loaded", async () => {
      await expect(hoverPage.pageTitle).toBeVisible();
    });

    await test.step("Hover over the images and verify user name is displayed", async () => {
      for (let userId = 1; userId <= USER_COUNT; userId++) {
        await hoverPage.hoverOverUserImage(userId);
        const userName = await hoverPage.getUserName(userId);
        expect(await hoverPage.isUserNameVisible(userId)).toBeTruthy();
        expect(userName, `User name for user${userId} is correct`).toBe(
          HoverPageLabels.USER_NAME(userId),
        );
      }
    });
  });

  test("Hover over user image and click on profile link, and verify user profile page is displayed", async ({
    hoverPage,
  }) => {
    await test.step("Hover over the first user image and verify profile link", async () => {
      const userId = 1;
      await hoverPage.hoverOverUserImage(userId);
      expect(await hoverPage.isUserProfileLinkVisible(userId)).toBeTruthy();
      expect(await hoverPage.getUserProfileLink(userId)).toContain(`/users/${userId}`);
    });
  });
});
