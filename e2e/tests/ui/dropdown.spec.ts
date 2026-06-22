import { test, expect } from "../../fixtures/pages.fixture.js";
import { TestData } from "../../data/test-data.js";

test.describe("Dropdown page tests", () => {
  test("Select an option and verify it becomes the selected value", async ({ dropdownPage }) => {
    await test.step("Verify the page loaded", async () => {
      await expect(dropdownPage.pageTitle).toBeVisible();
    });

    await test.step("Select the configured dropdown option", async () => {
      await dropdownPage.selectOptionByLabel(TestData.DROPDOWN_OPTION);
    });

    await test.step("Verify the selected option matches the chosen value", async () => {
      expect(await dropdownPage.getSelectedOption()).toBe(TestData.DROPDOWN_OPTION);
    });
  });
});
