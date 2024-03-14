import { expect, test } from "@playwright/test";

const URL = "https://the-internet.herokuapp.com/download";


test.beforeEach(async ({ page }) => {
    await page.goto(URL);
    await expect(page.locator('h3')).toHaveText(/File Downloader/);

});

test("Download content", async ({ page }) => {
    const downloadPromise = page.waitForEvent('download');
    await page.getByText('LambdaTest.txt').click();
    const download = await downloadPromise;
    await download.saveAs('./e2e/downloads/' + download.suggestedFilename());

});