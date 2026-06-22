import { type Locator, type Page } from "@playwright/test";
import { BasePage } from "./base.page.js";

export class InputPage extends BasePage {
  readonly pageTitle: Locator;
  readonly displayInputsButton: Locator;
  readonly clearInputsButton: Locator;
  readonly numberInputField: Locator;
  readonly textInputField: Locator;
  readonly passwordInputField: Locator;
  readonly dateInputField: Locator;
  readonly numberOutputField: Locator;
  readonly textOutputField: Locator;
  readonly passwordOutputField: Locator;
  readonly dateOutputField: Locator;

  constructor(page: Page) {
    super(page);
    this.pageTitle = page.locator(".container h1", {
      hasText: "Web inputs page for Automation Testing Practice",
    });
    this.displayInputsButton = page.getByRole("button", { name: "Display Inputs" });
    this.clearInputsButton = page.getByRole("button", { name: "Clear Inputs" });
    this.numberInputField = page.locator("#input-number");
    this.textInputField = page.getByLabel("Input: Text");
    this.passwordInputField = page.getByLabel("Input: Password");
    this.dateInputField = page.getByLabel("Input: Date");
    this.numberOutputField = page.locator("#output-number");
    this.textOutputField = page.locator("#output-text");
    this.passwordOutputField = page.locator("#output-password");
    this.dateOutputField = page.locator("#output-date");
  }

  async clickDisplayInputsButton(): Promise<void> {
    await this.displayInputsButton.click();
  }

  getOutputFields(): Locator[] {
    return [
      this.numberOutputField,
      this.textOutputField,
      this.passwordOutputField,
      this.dateOutputField,
    ];
  }

  async clickClearInputsButton() {
    await this.clearInputsButton.click();
  }

  async fillNumberInputField(value: string) {
    await this.numberInputField.fill(value);
  }

  async fillTextInputField(value: string) {
    await this.textInputField.fill(value);
  }

  async fillPasswordInputField(value: string) {
    await this.passwordInputField.fill(value);
  }

  async fillDateInputField(value: string) {
    await this.dateInputField.fill(value);
  }

  async fillAllInputFields(
    numberValue: string,
    textValue: string,
    passwordValue: string,
    dateValue: string,
  ) {
    await this.fillNumberInputField(numberValue);
    await this.fillTextInputField(textValue);
    await this.fillPasswordInputField(passwordValue);
    await this.fillDateInputField(dateValue);
  }
}
