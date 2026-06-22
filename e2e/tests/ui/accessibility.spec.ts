import { type TestInfo } from "@playwright/test";
import { type AxeBuilder } from "@axe-core/playwright";
import { test, expect } from "../../fixtures/a11y.fixture.js";

/**
 * Runs the configured axe scan, attaches the full report to the HTML report for
 * triage, and returns the violations for the test to assert on. Keeps the
 * scan-and-attach sequence DRY across the pages we check (no assertions here —
 * those stay in the tests, per CLAUDE.md).
 */
async function scanAndAttach(
  makeAxeBuilder: () => AxeBuilder,
  testInfo: TestInfo,
): Promise<unknown[]> {
  const results = await makeAxeBuilder().analyze();
  await testInfo.attach("axe-results", {
    body: JSON.stringify(results, null, 2),
    contentType: "application/json",
  });
  return results.violations;
}

test.describe("Accessibility", () => {
  test("login page has no WCAG A/AA violations", async ({
    loginPage,
    makeAxeBuilder,
  }, testInfo) => {
    await expect(loginPage.pageTitle).toBeVisible();
    expect(await scanAndAttach(makeAxeBuilder, testInfo)).toEqual([]);
  });

  test("inputs page has no WCAG A/AA violations", async ({
    inputPage,
    makeAxeBuilder,
  }, testInfo) => {
    await expect(inputPage.pageTitle).toBeVisible();
    expect(await scanAndAttach(makeAxeBuilder, testInfo)).toEqual([]);
  });

  test("hover page has no WCAG A/AA violations", async ({
    hoverPage,
    makeAxeBuilder,
  }, testInfo) => {
    await expect(hoverPage.pageTitle).toBeVisible();
    expect(await scanAndAttach(makeAxeBuilder, testInfo)).toEqual([]);
  });

  test("checkboxes page has no WCAG A/AA violations", async ({
    checkboxesPage,
    makeAxeBuilder,
  }, testInfo) => {
    await expect(checkboxesPage.pageTitle).toBeVisible();
    expect(await scanAndAttach(makeAxeBuilder, testInfo)).toEqual([]);
  });
});
