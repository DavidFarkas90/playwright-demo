import { test, expect } from "../../fixtures/pages.fixture.js";

const FIRST_CHECKBOX = 1;
const SECOND_CHECKBOX = 2;

test.describe("Checkboxes page tests", () => {
  test("Toggle both checkboxes and verify their resulting states", async ({ checkboxesPage }) => {
    await test.step("Verify the page loaded", async () => {
      await expect(checkboxesPage.pageTitle).toBeVisible();
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
