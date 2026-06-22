import { test, expect } from "@playwright/test";
import { DynamicTablePage } from "../../pages/dynamic-table.page.js";
import { PageUrls } from "../../constants/page-urls.js";
import { DynamicTablePageLabels } from "../../constants/dynamic-table-page-labels.js";
import { TestData } from "../../data/test-data.js";

let dynamicTablePage: DynamicTablePage;

test.describe("Dynamic table page tests", () => {
  test.beforeEach(async ({ page }) => {
    dynamicTablePage = new DynamicTablePage(page);
    await page.goto(PageUrls.DYNAMIC_TABLE_PAGE());
  });

  test("Chrome CPU cell matches the value shown in the yellow label", async () => {
    await test.step("Verify the page title is correct", async () => {
      expect(await dynamicTablePage.getPageTitle()).toBe(DynamicTablePageLabels.PAGE_TITLE);
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
