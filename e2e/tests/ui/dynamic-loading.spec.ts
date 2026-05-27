import { test, expect } from "@playwright/test";
import { HerokuDynamicLoadingPage } from "../../pages/heroku-dynamic-loading.page.js";
import { CommitQualityDynamicLoadingPage } from "../../pages/commit-quality-dynamic-loading.page.js";
import { PageUrls } from "../../constants/page-urls.js";
import { Timeouts } from "../../constants/timeouts.js";

test.describe("Dynamic loading tests", () => {
  test.describe("Heroku", () => {
    let herokuPage: HerokuDynamicLoadingPage;

    test.beforeEach(async ({ page }) => {
      herokuPage = new HerokuDynamicLoadingPage(page);
      await page.goto(PageUrls.HEROKU_DYNAMIC_LOADING_PAGE);
    });

    test("Clicking Start shows a loading spinner, then reveals the Hello World heading", async () => {
      await test.step("Click Start and verify loading spinner is visible", async () => {
        await herokuPage.clickStart();
        await expect(herokuPage.loadingSpinner).toBeVisible();
      });

      await test.step("Wait for Hello World heading to appear after loading completes", async () => {
        await expect(herokuPage.helloWorldHeading).toBeVisible({
          timeout: Timeouts.DYNAMIC_LOADING,
        });
      });
    });
  });

  test.describe("Commit quality", () => {
    let commitQualityPage: CommitQualityDynamicLoadingPage;

    test.beforeEach(async ({ page }) => {
      commitQualityPage = new CommitQualityDynamicLoadingPage(page);
      await page.goto(PageUrls.COMMIT_QUALITY_DYNAMIC_LOADING_PAGE);
    });

    test("Clicking Always Visible shows a loading state, then reveals the delayed button", async () => {
      await test.step("Click Always Visible and verify loading button is shown", async () => {
        await commitQualityPage.clickAlwaysVisible();
        await expect(commitQualityPage.loadingButton).toBeVisible();
      });

      await test.step("Wait for delayed button to appear after loading completes", async () => {
        await expect(commitQualityPage.delayedButton).toBeVisible({
          timeout: Timeouts.DYNAMIC_LOADING,
        });
      });
    });
  });
});
