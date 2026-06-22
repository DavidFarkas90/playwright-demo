import { test, expect } from "@playwright/test";
import { RadioButtonsPage } from "../../pages/radio-buttons.page.js";
import { PageUrls } from "../../constants/page-urls.js";
import { RadioButtonsPageLabels } from "../../constants/radio-buttons-page-labels.js";
import { TestData } from "../../data/test-data.js";

let radioButtonsPage: RadioButtonsPage;

test.describe("Radio buttons page tests", () => {
  test.beforeEach(async ({ page }) => {
    radioButtonsPage = new RadioButtonsPage(page);
    await page.goto(PageUrls.RADIO_BUTTONS_PAGE());
  });

  test("Select a color and a sport and verify both are selected", async () => {
    await test.step("Verify the page title is correct", async () => {
      expect(await radioButtonsPage.getPageTitle()).toBe(RadioButtonsPageLabels.PAGE_TITLE);
    });

    await test.step("Select the configured color and sport radios", async () => {
      await radioButtonsPage.select(TestData.RADIO_COLOR);
      await radioButtonsPage.select(TestData.RADIO_SPORT);
    });

    await test.step("Verify both selected radios report as checked", async () => {
      await expect(radioButtonsPage.radio(TestData.RADIO_COLOR)).toBeChecked();
      await expect(radioButtonsPage.radio(TestData.RADIO_SPORT)).toBeChecked();
    });
  });
});
