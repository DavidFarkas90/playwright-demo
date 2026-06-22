import { test, expect } from "../../fixtures/auth.fixture.js";

// This spec uses the authenticated test variant: the worker-scoped fixture
// ensures a logged-in storage state and applies it, so tests start already
// logged in — no UI login step required.
test.describe("Secure area tests (authenticated via stored session)", () => {
  test("Reused auth state grants access to the secure area without logging in", async ({
    securePage,
  }) => {
    await test.step("Verify the secure area page loaded", async () => {
      await expect(securePage.pageTitle).toBeVisible();
    });

    await test.step("Verify the logout link is available", async () => {
      await expect(securePage.logoutButton).toBeVisible();
    });
  });
});
