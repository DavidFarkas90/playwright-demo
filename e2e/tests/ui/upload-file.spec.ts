import { expect, test } from "@playwright/test";
import { UploadPage } from "../../pages/upload.page.js";

test("Upload file heroku", async ({ page }) => {
  const PAGE_URL = "https://the-internet.herokuapp.com/upload";
  const PAGE_TITLE = "File Uploader";
  const INPUT_FILE_PATH = "./e2e/downloads/LambdaTest.txt";
  const INPUT_FILE_NAME = "LambdaTest.txt";
  const uploadPage = new UploadPage(page);

  await test.step("Navigat to page URL", async () => {
    await page.goto(PAGE_URL);
    expect(page.url(), "Page url is correct").toEqual(PAGE_URL);
  });

  await test.step("Validate page title", async () => {
    await expect(uploadPage.pageTitle).toBeVisible();
    const pageTitle = await uploadPage.getPageTitle();
    console.log("Page title:" + pageTitle);
    await expect(uploadPage.pageTitle, "Page title is correct").toHaveText(PAGE_TITLE);
  });

  await test.step("Upload file", async () => {
    await uploadPage.chooseInputFile(INPUT_FILE_PATH);
    await uploadPage.clickOnUploadFile();
  });

  await test.step("Validate the file is uploaded", async () => {
    const uploadedFileName = await uploadPage.getUploadedFile();
    expect(uploadedFileName, "Uploaded file is correct").toEqual(INPUT_FILE_NAME);
  });
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
