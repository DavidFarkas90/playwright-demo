import { expect, test } from "@playwright/test";
import fs from "fs";
import { UploadPracticePage } from "../../pages/upload.page.js";
import { PageUrls } from "../../constants/page-urls.js";
import { UploadPageLabels } from "../../constants/upload-page-labels.js";

let uploadPage: UploadPracticePage;
const uploadFileName: string = "practice-upload.txt";
const fileContent: string = "This is a test file for upload practice.";

test.describe("Upload file tests", () => {
  test.beforeEach(async ({ page }) => {
    uploadPage = new UploadPracticePage(page);
    await page.goto(PageUrls.UPLOAD_PAGE());
  });

  test("Upload a text file and verify the uploaded filename is displayed in the confirmation", async ({}, testInfo) => {
    const filePath = testInfo.outputPath(uploadFileName);

    fs.writeFileSync(filePath, fileContent);

    await test.step("Verify the upload page title", async () => {
      const pageTitle = await uploadPage.getPageTitle();
      expect(pageTitle).toBe(UploadPageLabels.PAGE_TITLE);
    });

    await test.step("Choose a file to upload", async () => {
      await uploadPage.clickChooseFileButton();
      await uploadPage.chooseInputFile(filePath);
    });

    await test.step("Upload the chosen file", async () => {
      await uploadPage.clickUploadFileButton();
    });

    await test.step("Verify the uploaded file name", async () => {
      const uploadedFileName = await uploadPage.getUploadedFile();
      expect(uploadedFileName, UploadPageLabels.UPLOADED_FILE_IS_CORRECT).toContain(uploadFileName);
    });
  });
});
