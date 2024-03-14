import { expect, test } from "@playwright/test";

const URL = "https://the-internet.herokuapp.com/upload";


test.beforeEach(async ({ page }) => {
    await page.goto(URL, { timeout: 10000 });

});

test("Upload file", async ({ page }) => {

    await page.setInputFiles('input[type="file"]', './e2e/downloads/LambdaTest.txt');
    await page.click('#file-submit');
    await expect(page.locator('#uploaded-files')).toContainText('LambdaTest.txt');

});