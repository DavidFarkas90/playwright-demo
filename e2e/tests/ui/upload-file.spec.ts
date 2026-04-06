import { expect, test } from "@playwright/test";
import fs from "fs";

test("Upload file heroku", async ({ page }, testInfo) => {
  const filePath = testInfo.outputPath("temp.txt");

  fs.writeFileSync(filePath, "Test file content");

  await page.goto("https://the-internet.herokuapp.com/upload");

  await page.locator("#file-upload").setInputFiles(filePath);
  await page.locator("#file-submit").click();

  await expect(page.locator("#uploaded-files")).toHaveText("temp.txt");
});

test("Upload file commit quality", async ({ page }) => {
  const URL_2 = "https://commitquality.com/practice-file-upload";

  await page.goto(URL_2, { timeout: 10000 });

  // Start waiting for file chooser before clicking. Note no await.
  const fileChooserPromise = page.waitForEvent("filechooser");
  await page.locator("#file-input").click();
  const fileChooser = await fileChooserPromise;
  await fileChooser.setFiles("./e2e/downloads/LambdaTest.txt");

  // await page.setInputFiles('#file-input', './e2e/downloads/LambdaTest.txt');
  // await page.getByRole('button', { name: 'Submit' }).click();
  await expect(page.locator("#file-input")).toHaveValue(/LambdaTest.txt/);
});
