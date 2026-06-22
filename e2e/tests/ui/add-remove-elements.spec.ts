import { test, expect } from "../../fixtures/pages.fixture.js";
import { TestData } from "../../data/test-data.js";

const FIRST_ELEMENT = 0;

test.describe("Add/remove elements page tests", () => {
  test("Add elements then delete one and verify the counts", async ({ addRemoveElementsPage }) => {
    await test.step("Verify the page loaded", async () => {
      await expect(addRemoveElementsPage.pageTitle).toBeVisible();
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
