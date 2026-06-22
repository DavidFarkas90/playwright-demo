import { test, expect } from "../../fixtures/pages.fixture.js";
import { DynamicTablePageLabels } from "../../constants/dynamic-table-page-labels.js";
import { TestData } from "../../data/test-data.js";

test.describe("Dynamic table page tests", () => {
  test("Chrome CPU cell matches the value shown in the yellow label", async ({
    dynamicTablePage,
  }) => {
    await test.step("Verify the page loaded", async () => {
      await expect(dynamicTablePage.pageTitle).toBeVisible();
    });

    await test.step("Read the Chrome CPU value from the table and from the label", async () => {
      const cpuFromTable = await dynamicTablePage.getCellValue(
        TestData.TABLE_PROCESS,
        DynamicTablePageLabels.CPU_COLUMN,
      );
      const cpuFromLabel = await dynamicTablePage.getExpectedChromeCpu();

      expect(cpuFromTable).toBe(cpuFromLabel);
    });
  });
});
