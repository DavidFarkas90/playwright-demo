import { expect, test } from "@playwright/test";
import fs from "fs";
import { UploadPracticePage } from "../../pages/upload.page.js";
import { PageUrls } from "../../constants/page-urls.js";
import { uploadPageLabels } from "../../constants/upload-page-labels.js";

let uploadPage: UploadPracticePage;
const uploadFileName: string = "practice-upload.txt";
const fileContent: string = "This is a test file for upload practice.";

test.beforeEach(({ page }) => {
  uploadPage = new UploadPracticePage(page);
});

test("Upload file practice", async ({ page }, testInfo) => {
  const filePath = testInfo.outputPath(uploadFileName);

  fs.writeFileSync(filePath, fileContent);

  await test.step("Navigate to the upload practice page", async () => {
    await page.goto(PageUrls.UPLOAD_PRACTICE_PAGE);
    const pageTitle = await uploadPage.getPageTitle();
    expect(pageTitle).toBe(uploadPageLabels.PAGE_TITLE);
  });

  await test.step("Choose a file to upload", async () => {
    await uploadPage.clickOnChooseFileButton();
    await uploadPage.chooseInputFile(filePath);
  });

  await test.step("Upload the chosen file", async () => {
    await uploadPage.clickOnUploadFile();
  });

  await test.step("Verify the uploaded file name", async () => {
    const uploadedFileName = await uploadPage.getUploadedFile();
    expect(uploadedFileName, uploadPageLabels.UPLOADED_FILE_IS_CORRECT).toContain(uploadFileName);
  });
});
