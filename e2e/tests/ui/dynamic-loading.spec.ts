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

    test("heroku dynamic loading", async () => {
      await herokuPage.clickStart();
      await expect(herokuPage.loadingSpinner).toBeVisible();
      await expect(herokuPage.helloWorldHeading).toBeVisible({ timeout: Timeouts.DYNAMIC_LOADING });
    });
  });

  test.describe("Commitquality", () => {
    let commitQualityPage: CommitQualityDynamicLoadingPage;

    test.beforeEach(async ({ page }) => {
      commitQualityPage = new CommitQualityDynamicLoadingPage(page);
      await page.goto(PageUrls.COMMIT_QUALITY_DYNAMIC_LOADING_PAGE);
    });

    test("commit quality dynamic loading", async () => {
      await commitQualityPage.clickAlwaysVisible();
      await expect(commitQualityPage.loadingButton).toBeVisible();
      await expect(commitQualityPage.delayedButton).toBeVisible({
        timeout: Timeouts.DYNAMIC_LOADING,
      });
    });
  });
});
