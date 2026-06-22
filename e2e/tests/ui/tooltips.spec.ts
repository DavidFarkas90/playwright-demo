import { test, expect } from "../../fixtures/pages.fixture.js";
import { TooltipsPageLabels } from "../../constants/tooltips-page-labels.js";

const TOP_TRIGGER = 1;
const BOTTOM_TRIGGER = 3;

test.describe("Tooltips page tests", () => {
  test("Hovering the top trigger shows its tooltip text", async ({ tooltipsPage }) => {
    await test.step("Verify the page loaded", async () => {
      await expect(tooltipsPage.pageTitle).toBeVisible();
    });

    await test.step("Hover the top tooltip trigger", async () => {
      await tooltipsPage.hoverTrigger(TOP_TRIGGER);
    });

    await test.step("Verify the tooltip is visible with the expected text", async () => {
      await expect(tooltipsPage.tooltip).toBeVisible();
      await expect(tooltipsPage.tooltip).toHaveText(TooltipsPageLabels.TOOLTIP_TOP);
    });
  });

  test("Hovering the bottom trigger shows its tooltip text", async ({ tooltipsPage }) => {
    await test.step("Hover the bottom tooltip trigger", async () => {
      await tooltipsPage.hoverTrigger(BOTTOM_TRIGGER);
    });

    await test.step("Verify the tooltip shows the expected text", async () => {
      await expect(tooltipsPage.tooltip).toHaveText(TooltipsPageLabels.TOOLTIP_BOTTOM);
    });
  });
});
