import { test, expect } from "../../fixtures/pages.fixture.js";
import fs from "fs";
import { UploadPageLabels } from "../../constants/upload-page-labels.js";

const uploadFileName: string = "practice-upload.txt";
const fileContent: string = "This is a test file for upload practice.";

test.describe("Upload file tests", () => {
  test("Upload a text file and verify the uploaded filename is displayed in the confirmation", async ({
    uploadPage,
  }, testInfo) => {
    const filePath = testInfo.outputPath(uploadFileName);

    fs.writeFileSync(filePath, fileContent);

    await test.step("Verify the page loaded", async () => {
      await expect(uploadPage.pageTitle).toBeVisible();
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
