import { type Locator, type Page } from "@playwright/test";
import { BasePage } from "./base.page.js";
import { JsDialogsPageLabels } from "../constants/js-dialogs-page-labels.js";

/**
 * Page object for the JavaScript Dialogs page.
 *
 * Native dialogs (alert/confirm/prompt) cannot be interacted with through the
 * DOM — Playwright surfaces them via the `dialog` event. We register a one-shot
 * handler with `page.once("dialog", ...)` BEFORE triggering the button, so the
 * dialog is auto-handled the moment it opens. Tests stay declarative: they call
 * `handleNextDialog(...)`, click a trigger, then assert on `getDialogResponse()`.
 */
export class JsDialogsPage extends BasePage {
  readonly pageTitle: Locator;
  readonly alertButton: Locator;
  readonly confirmButton: Locator;
  readonly promptButton: Locator;
  readonly dialogResponse: Locator;

  constructor(page: Page) {
    super(page);
    this.pageTitle = page.locator(".page-layout h1", { hasText: JsDialogsPageLabels.PAGE_TITLE });
    this.alertButton = page.getByRole("button", { name: JsDialogsPageLabels.ALERT_BUTTON });
    this.confirmButton = page.getByRole("button", { name: JsDialogsPageLabels.CONFIRM_BUTTON });
    this.promptButton = page.getByRole("button", { name: JsDialogsPageLabels.PROMPT_BUTTON });
    this.dialogResponse = page.locator("#dialog-response");
  }

  /**
   * Registers a one-shot handler for the next native dialog.
   * @param accept     accept the dialog when true, dismiss it when false
   * @param promptText optional text entered into a prompt dialog before accepting
   */
  async handleNextDialog(accept: boolean, promptText?: string): Promise<void> {
    this.page.once("dialog", async (dialog) => {
      if (accept) {
        await dialog.accept(promptText);
      } else {
        await dialog.dismiss();
      }
    });
  }

  async clickAlert(): Promise<void> {
    await this.alertButton.click();
  }

  async clickConfirm(): Promise<void> {
    await this.confirmButton.click();
  }

  async clickPrompt(): Promise<void> {
    await this.promptButton.click();
  }

  /** Returns the text the page wrote into the dialog-response element. */
  async getDialogResponse(): Promise<string> {
    return await this.dialogResponse.innerText();
  }
}
