import { expect, test } from "@playwright/test";
import { DragAndDropPage } from "../../pages/drag-n-drop.page.js";
import { PageUrls } from "../../constants/page-urls.js";
import { Timeouts } from "../../constants/timeouts.js";

let dragPage: DragAndDropPage;

test.describe("Drag and drop tests", () => {
  test.beforeEach(async ({ page }) => {
    dragPage = new DragAndDropPage(page);
    await page.goto(PageUrls.DRAG_AND_DROP_PAGE, { timeout: Timeouts.SLOW_PAGE_NAVIGATION });
  });

  test("Drag small box onto large box and verify success message is displayed", async () => {
    await test.step("Drag small box to the large box drop target", async () => {
      await dragPage.dragSmallBoxToLargeBox();
    });

    await test.step("Verify the drop target shows a success message", async () => {
      await expect(dragPage.dropTarget).toContainText("Success!");
    });
  });
});
