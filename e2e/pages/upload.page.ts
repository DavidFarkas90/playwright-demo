import { type Locator, type Page } from "@playwright/test";
import { UploadPageLabels } from "../constants/upload-page-labels.js";

export class UploadPracticePage {
  readonly page: Page;
  readonly pageTitle: Locator;
  readonly chooseFileButton: Locator;
  readonly uploadFileButton: Locator;
  readonly uploadedFile: Locator;

  constructor(page: Page) {
    this.page = page;
    this.pageTitle = page.locator(".page-layout h1", { hasText: UploadPageLabels.PAGE_TITLE });
    this.chooseFileButton = page.getByTestId("file-input");
    this.uploadFileButton = page.getByTestId("file-submit");
    this.uploadedFile = page.locator("#uploaded-files");
  }

  async getPageTitle(): Promise<string> {
    return await this.pageTitle.innerText();
  }

  async clickChooseFileButton() {
    await this.chooseFileButton.click();
  }

  async clickUploadFileButton() {
    await this.uploadFileButton.click();
  }

  async getUploadedFile(): Promise<string> {
    return await this.uploadedFile.innerText();
  }

  async chooseInputFile(filePath: string) {
    await this.chooseFileButton.setInputFiles(filePath);
  }
}
