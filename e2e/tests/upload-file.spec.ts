import { expect, test } from "@playwright/test";

const URL = "https://commitquality.com/practice-file-upload";


test.beforeEach(async ({ page }) => {
    await page.goto(URL);

});

test("Upload file", async ({ page }) => {
    // Start waiting for file chooser before clicking. Note no await.
    const fileChooserPromise = page.waitForEvent('filechooser');
    await page.locator("#file-input").click();
    const fileChooser = await fileChooserPromise;
    await fileChooser.setFiles("./e2e/downloads/LambdaTest.txt");
    await page.getByRole('button', { name: /submit/i }).click();

});