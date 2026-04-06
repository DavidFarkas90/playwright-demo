import { type Locator, type Page } from "@playwright/test";

export class UploadPage {
  readonly page: Page;
  readonly pageTitle: Locator;
  readonly chooseFileButton: Locator;
  readonly uploadFileButton: Locator;
  readonly uploadedFile: Locator;
  readonly inputFile: string;

  constructor(page: Page) {
    this.page = page;
    this.pageTitle = page.locator("h3", { hasText: "File Uploader" });
    this.chooseFileButton = page.locator("#file-upload");
    this.uploadFileButton = page.locator("#file-submit");
    this.uploadedFile = page.locator("#uploaded-files");
    this.inputFile = "#file-upload";
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
