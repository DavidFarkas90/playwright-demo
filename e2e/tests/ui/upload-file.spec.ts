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
