import { test, expect, type Locator } from "@playwright/test";
import { InputPage } from "../../pages/input.page.js";
import { PageUrls } from "../../constants/page-urls.js";

let inputPage: InputPage;
const numberValue: string = "12345";
const textValue: string = "Test input";
const passwordValue: string = "password123";
const dateValue: string = "2024-01-01";
const expectedValues: Array<string> = [numberValue, textValue, passwordValue, dateValue];

test.describe("Input fields test page", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(PageUrls.INPUT_PAGE);
    inputPage = new InputPage(page);
    await expect(inputPage.pageTitle).toBeVisible();
  });

  test("Fill numbers input field, click display inputs and verify the output", async () => {
    await inputPage.fillNumberInputField(numberValue);
    await inputPage.clickDisplayInputsButton();
    const outputFields = inputPage.getOutputFields();
    await expect(outputFields[0]!).toBeVisible();
    await expect(outputFields[0]!).toHaveText(numberValue);
  });

  test("Fill all input fields, click display inputs and verify the outputs", async () => {
    await inputPage.fillAllInputFields(numberValue, textValue, passwordValue, dateValue);
    await inputPage.clickDisplayInputsButton();
    const outputFields = inputPage.getOutputFields();

    for (const [i, expectedValue] of expectedValues.entries()) {
      await expect(outputFields[i]!).toBeVisible();
      await expect(outputFields[i]!).toHaveText(expectedValue);
    }
  });

  test("Fill all input fields, click clear inputs and verify the outputs are cleared", async () => {
    let outputFields: Locator[];

    await test.step("Fill all input fields and click display inputs", async () => {
      await inputPage.fillAllInputFields(numberValue, textValue, passwordValue, dateValue);
      await inputPage.clickDisplayInputsButton();
      outputFields = inputPage.getOutputFields();
    });

    await test.step("Validate the input values are displayed", async () => {
      for (const [i, expectedValue] of expectedValues.entries()) {
        await expect(outputFields[i]!).toBeVisible();
        await expect(outputFields[i]!).toHaveText(expectedValue);
      }
    });

    await test.step("Click clear inputs and validate the output fields are cleared", async () => {
      await inputPage.clickClearInputsButton();
      await inputPage.clickDisplayInputsButton();
      outputFields = inputPage.getOutputFields();

      for (const outputField of outputFields) {
        await expect(outputField).toBeVisible();
        await expect(outputField).toHaveText("");
      }
    });
  });
});
