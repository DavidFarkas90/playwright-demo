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

  test("Drag and drop", async () => {
    await dragPage.dragSmallBoxToLargeBox();
    await expect(dragPage.dropTarget).toContainText("Success!");
  });
});
