import { expect, test } from "@playwright/test";

test("Upload file heroku", async ({ page }) => {

    const URL = "https://the-internet.herokuapp.com/upload";

    await page.goto(URL, { timeout: 10000 });
    await page.setInputFiles('input[type="file"]', './e2e/downloads/LambdaTest.txt');
    await page.click('#file-submit');
    await expect(page.locator('#uploaded-files')).toContainText('LambdaTest.txt');

});

test("Upload file commitquality", async ({ page }) => {

    const URL_2 = "https://commitquality.com/practice-file-upload";

    await page.goto(URL_2, { timeout: 10000 });


    // Start waiting for file chooser before clicking. Note no await.
    const fileChooserPromise = page.waitForEvent('filechooser');
    await page.locator('#file-input').click();
    const fileChooser = await fileChooserPromise;
    await fileChooser.setFiles('./e2e/downloads/LambdaTest.txt');

    // await page.setInputFiles('#file-input', './e2e/downloads/LambdaTest.txt');
    // await page.getByRole('button', { name: 'Submit' }).click();
    await expect(page.locator('#file-input')).toHaveValue(/LambdaTest.txt/);

});