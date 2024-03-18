import { expect, test } from "@playwright/test";

const URL = "https://commitquality.com/practice-drag-and-drop";


test("Drag and drop", async ({ page }) => {

    await page.goto(URL, { timeout: 10000 });
    await page.locator("#small-box").dragTo(page.locator(".large-box"));
    await expect(page.locator(".inside")).toContainText('Success!');

});