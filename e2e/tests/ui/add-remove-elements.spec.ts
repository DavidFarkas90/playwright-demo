import { test, expect } from "@playwright/test";
import { AddRemoveElementsPage } from "../../pages/add-remove-elements.page.js";
import { PageUrls } from "../../constants/page-urls.js";
import { AddRemoveElementsPageLabels } from "../../constants/add-remove-elements-page-labels.js";
import { TestData } from "../../data/test-data.js";

let addRemoveElementsPage: AddRemoveElementsPage;
const FIRST_ELEMENT = 0;

test.describe("Add/remove elements page tests", () => {
  test.beforeEach(async ({ page }) => {
    addRemoveElementsPage = new AddRemoveElementsPage(page);
    await page.goto(PageUrls.ADD_REMOVE_ELEMENTS_PAGE());
  });

  test("Add elements then delete one and verify the counts", async () => {
    await test.step("Verify the page title is correct", async () => {
      expect(await addRemoveElementsPage.getPageTitle()).toBe(
        AddRemoveElementsPageLabels.PAGE_TITLE,
      );
    });

    await test.step("Verify no delete buttons exist initially", async () => {
      await expect(addRemoveElementsPage.deleteButtons).toHaveCount(0);
    });

    await test.step(`Add ${TestData.ELEMENTS_TO_ADD} elements`, async () => {
      await addRemoveElementsPage.addElements(TestData.ELEMENTS_TO_ADD);
      await expect(addRemoveElementsPage.deleteButtons).toHaveCount(TestData.ELEMENTS_TO_ADD);
    });

    await test.step("Delete one element and verify the count decremented", async () => {
      await addRemoveElementsPage.deleteElementAt(FIRST_ELEMENT);
      await expect(addRemoveElementsPage.deleteButtons).toHaveCount(TestData.ELEMENTS_TO_ADD - 1);
    });
  });
});
