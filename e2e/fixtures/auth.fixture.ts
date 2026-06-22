import fs from "fs";
import { test as base, expect } from "./pages.fixture.js";
import { AUTH_STORAGE_STATE } from "./auth.js";
import { LoginPage } from "../pages/login.page.js";
import { PageUrls } from "../constants/page-urls.js";
import { LoginPageLabels } from "../constants/login-page-labels.js";

const USERNAME: string = process.env.EXPAND_TESTING_USERNAME ?? "username-not-set";
const PASSWORD: string = process.env.EXPAND_TESTING_PASSWORD ?? "password-not-set";

/**
 * Authenticated test variant.
 *
 * Extends the page-object `test` with a worker-scoped fixture that logs in once
 * per worker (only if the saved storage state is missing) and then overrides
 * the built-in `storageState` option so every test in the file starts already
 * authenticated. Unlike a `setup` project, this needs no manual step in UI mode
 * and no project dependency — it runs automatically wherever it's imported.
 *
 * Import this `test` ONLY in specs that require an authenticated session.
 * Anonymous specs (e.g. the login flow itself) import from `pages.fixture.ts`.
 */
type AuthWorkerFixtures = {
  workerStorageState: string;
};

export const test = base.extend<object, AuthWorkerFixtures>({
  // Logs in once per worker (reusing the saved file across runs) and yields its path.
  workerStorageState: [
    async ({ browser }, use) => {
      if (!fs.existsSync(AUTH_STORAGE_STATE)) {
        // A fresh page starts with no storage state (anonymous), as needed for login.
        const page = await browser.newPage();
        const loginPage = new LoginPage(page);

        await page.goto(PageUrls.LOGIN_PAGE);
        await loginPage.login(USERNAME, PASSWORD);
        await expect(loginPage.alert).toContainText(LoginPageLabels.YOU_LOGGED_INTO_A_SECURE_AREA);

        await page.context().storageState({ path: AUTH_STORAGE_STATE });
        await page.close();
      }
      await use(AUTH_STORAGE_STATE);
    },
    { scope: "worker" },
  ],

  // Override the built-in option so contexts in this test variant are authenticated.
  storageState: ({ workerStorageState }, use) => use(workerStorageState),
});

export { expect };
