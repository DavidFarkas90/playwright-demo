import { test, expect } from "../../fixtures/pages.fixture.js";
import { KeyPressesPageLabels } from "../../constants/key-presses-page-labels.js";
import { TestData } from "../../data/test-data.js";

test.describe("Key presses page tests", () => {
  // Data-driven: one test per key in the dataset.
  for (const { press, echoed } of TestData.KEY_PRESSES) {
    test(`Pressing "${press}" is echoed as "${echoed}"`, async ({ keyPressesPage }) => {
      await test.step("Verify the page loaded", async () => {
        await expect(keyPressesPage.pageTitle).toBeVisible();
      });

      await test.step(`Press the "${press}" key`, async () => {
        await keyPressesPage.pressKey(press);
      });

      await test.step("Verify the result echoes the pressed key", async () => {
        await expect(keyPressesPage.result).toHaveText(KeyPressesPageLabels.RESULT(echoed));
      });
    });
  }
});
