import { type Locator, type Page } from "@playwright/test";
import { uploadPageLabels } from "../constants/upload-page-labels.js";

export class UploadPracticePage {
  readonly page: Page;
  readonly pageTitle: Locator;
  readonly chooseFileButton: Locator;
  readonly uploadFileButton: Locator;
  readonly uploadedFile: Locator;
  readonly inputFile: string;

  constructor(page: Page) {
    this.page = page;
    this.pageTitle = page.locator(".page-layout h1", { hasText: uploadPageLabels.PAGE_TITLE });
    this.chooseFileButton = page.getByTestId("file-input");
    this.uploadFileButton = page.getByTestId("file-submit");
    this.uploadedFile = page.locator("#uploaded-files");
    this.inputFile = "[data-testid='file-input']";
  }

  async getPageTitle(): Promise<string> {
    return await this.pageTitle.innerText();
  }

  async clickOnChooseFileButton() {
    await this.chooseFileButton.click();
  }

  async clickOnUploadFile() {
    await this.uploadFileButton.click();
  }

  async getUploadedFile(): Promise<string> {
    return await this.uploadedFile.innerText();
  }

  async chooseInputFile(filePath: string) {
    this.page.setInputFiles(this.inputFile, filePath);
  }
}
