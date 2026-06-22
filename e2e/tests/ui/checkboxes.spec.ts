import { test, expect } from "@playwright/test";
import { CheckboxesPage } from "../../pages/checkboxes.page.js";
import { PageUrls } from "../../constants/page-urls.js";
import { CheckboxesPageLabels } from "../../constants/checkboxes-page-labels.js";

let checkboxesPage: CheckboxesPage;
const FIRST_CHECKBOX = 1;
const SECOND_CHECKBOX = 2;

test.describe("Checkboxes page tests", () => {
  test.beforeEach(async ({ page }) => {
    checkboxesPage = new CheckboxesPage(page);
    await page.goto(PageUrls.CHECKBOXES_PAGE());
  });

  test("Toggle both checkboxes and verify their resulting states", async () => {
    await test.step("Verify the page title is correct", async () => {
      expect(await checkboxesPage.getPageTitle()).toBe(CheckboxesPageLabels.PAGE_TITLE);
    });

    await test.step("Verify the default states (first unchecked, second checked)", async () => {
      await expect(checkboxesPage.checkbox(FIRST_CHECKBOX)).not.toBeChecked();
      await expect(checkboxesPage.checkbox(SECOND_CHECKBOX)).toBeChecked();
    });

    await test.step("Check the first checkbox and uncheck the second", async () => {
      await checkboxesPage.checkBox(FIRST_CHECKBOX);
      await checkboxesPage.uncheckBox(SECOND_CHECKBOX);
    });

    await test.step("Verify the states are now inverted", async () => {
      await expect(checkboxesPage.checkbox(FIRST_CHECKBOX)).toBeChecked();
      await expect(checkboxesPage.checkbox(SECOND_CHECKBOX)).not.toBeChecked();
    });
  });
});
