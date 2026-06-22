import { test, expect } from "@playwright/test";
import { DropdownPage } from "../../pages/dropdown.page.js";
import { PageUrls } from "../../constants/page-urls.js";
import { DropdownPageLabels } from "../../constants/dropdown-page-labels.js";
import { TestData } from "../../data/test-data.js";

let dropdownPage: DropdownPage;

test.describe("Dropdown page tests", () => {
  test.beforeEach(async ({ page }) => {
    dropdownPage = new DropdownPage(page);
    await page.goto(PageUrls.DROPDOWN_PAGE());
  });

  test("Select an option and verify it becomes the selected value", async () => {
    await test.step("Verify the page title is correct", async () => {
      expect(await dropdownPage.getPageTitle()).toBe(DropdownPageLabels.PAGE_TITLE);
    });

    await test.step("Select the configured dropdown option", async () => {
      await dropdownPage.selectOptionByLabel(TestData.DROPDOWN_OPTION);
    });

    await test.step("Verify the selected option matches the chosen value", async () => {
      expect(await dropdownPage.getSelectedOption()).toBe(TestData.DROPDOWN_OPTION);
    });
  });
});
