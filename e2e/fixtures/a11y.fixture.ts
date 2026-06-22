import { test as base, expect } from "./pages.fixture.js";
import { AxeBuilder } from "@axe-core/playwright";

/**
 * Accessibility fixture.
 *
 * Extends the page-object fixtures with a `makeAxeBuilder` factory (the pattern
 * recommended in the Playwright docs). Centralizing the axe configuration here
 * keeps the rule set consistent across specs: a spec declares the page object it
 * wants scanned (which handles navigation) plus `makeAxeBuilder`, then calls
 * `.analyze()` and asserts on the violations. Import `test`/`expect` from this
 * module for accessibility specs.
 */
type AxeFixtures = {
  makeAxeBuilder: () => AxeBuilder;
};

// WCAG 2.0/2.1 levels A and AA — the conformance target most teams hold to.
const WCAG_TAGS = ["wcag2a", "wcag2aa", "wcag21a", "wcag21aa"];

// The third-party practice site (practice.expandtesting.com) ships a known,
// site-wide color-contrast issue we cannot fix. Disabling this single rule keeps
// the scan green on that pre-existing problem while still flagging every other
// WCAG A/AA regression introduced in our flows. Remove this when testing an
// app we own.
const DISABLED_RULES = ["color-contrast"];

export const test = base.extend<AxeFixtures>({
  makeAxeBuilder: async ({ page }, use) => {
    await use(() => new AxeBuilder({ page }).withTags(WCAG_TAGS).disableRules(DISABLED_RULES));
  },
});

export { expect };
