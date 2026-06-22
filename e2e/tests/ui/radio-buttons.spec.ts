import { test, expect } from "../../fixtures/pages.fixture.js";
import { TestData } from "../../data/test-data.js";

test.describe("Radio buttons page tests", () => {
  test("Select a color and a sport and verify both are selected", async ({ radioButtonsPage }) => {
    await test.step("Verify the page loaded", async () => {
      await expect(radioButtonsPage.pageTitle).toBeVisible();
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
