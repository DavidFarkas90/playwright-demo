import { test, expect } from "../../fixtures/pages.fixture.js";
import { JsDialogsPageLabels } from "../../constants/js-dialogs-page-labels.js";
import { TestData } from "../../data/test-data.js";

test.describe("JavaScript dialogs page tests", () => {
  test("Accept an alert dialog", async ({ jsDialogsPage }) => {
    await test.step("Register the handler and trigger the alert", async () => {
      await jsDialogsPage.handleNextDialog(true);
      await jsDialogsPage.clickAlert();
    });

    await test.step("Verify the accepted-alert response is shown", async () => {
      expect(await jsDialogsPage.getDialogResponse()).toBe(
        JsDialogsPageLabels.RESPONSE_ALERT_ACCEPTED,
      );
    });
  });

  test("Accept a confirm dialog", async ({ jsDialogsPage }) => {
    await test.step("Register the handler and trigger the confirm", async () => {
      await jsDialogsPage.handleNextDialog(true);
      await jsDialogsPage.clickConfirm();
    });

    await test.step("Verify the accepted-confirm response is shown", async () => {
      expect(await jsDialogsPage.getDialogResponse()).toBe(
        JsDialogsPageLabels.RESPONSE_CONFIRM_ACCEPTED,
      );
    });
  });

  test("Dismiss a confirm dialog", async ({ jsDialogsPage }) => {
    await test.step("Register the handler and trigger the confirm", async () => {
      await jsDialogsPage.handleNextDialog(false);
      await jsDialogsPage.clickConfirm();
    });

    await test.step("Verify the dismissed-confirm response is shown", async () => {
      expect(await jsDialogsPage.getDialogResponse()).toBe(
        JsDialogsPageLabels.RESPONSE_CONFIRM_DISMISSED,
      );
    });
  });

  test("Enter text into a prompt dialog", async ({ jsDialogsPage }) => {
    await test.step("Register the handler with text and trigger the prompt", async () => {
      await jsDialogsPage.handleNextDialog(true, TestData.PROMPT_TEXT);
      await jsDialogsPage.clickPrompt();
    });

    await test.step("Verify the entered text is echoed in the response", async () => {
      expect(await jsDialogsPage.getDialogResponse()).toBe(TestData.PROMPT_TEXT);
    });
  });
});
