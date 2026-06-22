import { test as base, expect } from "@playwright/test";
import { PageUrls } from "../constants/page-urls.js";
import { LoginPage } from "../pages/login.page.js";
import { SecurePage } from "../pages/secure.page.js";
import { InputPage } from "../pages/input.page.js";
import { UploadPracticePage } from "../pages/upload.page.js";
import { HoverPage } from "../pages/hover.page.js";
import { DropdownPage } from "../pages/dropdown.page.js";
import { CheckboxesPage } from "../pages/checkboxes.page.js";
import { RadioButtonsPage } from "../pages/radio-buttons.page.js";
import { JsDialogsPage } from "../pages/js-dialogs.page.js";
import { DynamicTablePage } from "../pages/dynamic-table.page.js";
import { AddRemoveElementsPage } from "../pages/add-remove-elements.page.js";

/**
 * Page-object fixtures.
 *
 * Each fixture navigates to its page and provides a ready-to-use page object,
 * replacing the per-spec `let pageObject` + `beforeEach` boilerplate. A spec
 * declares only the page objects it needs as test arguments; only those
 * fixtures run (and navigate). Import `test` and `expect` from this module
 * instead of from `@playwright/test`.
 */
type PageObjects = {
  loginPage: LoginPage;
  securePage: SecurePage;
  inputPage: InputPage;
  uploadPage: UploadPracticePage;
  hoverPage: HoverPage;
  dropdownPage: DropdownPage;
  checkboxesPage: CheckboxesPage;
  radioButtonsPage: RadioButtonsPage;
  jsDialogsPage: JsDialogsPage;
  dynamicTablePage: DynamicTablePage;
  addRemoveElementsPage: AddRemoveElementsPage;
};

export const test = base.extend<PageObjects>({
  loginPage: async ({ page }, use) => {
    await page.goto(PageUrls.LOGIN_PAGE());
    await use(new LoginPage(page));
  },
  // Requires authenticated storage state (see auth.setup.ts); /secure redirects
  // to /login otherwise.
  securePage: async ({ page }, use) => {
    await page.goto(PageUrls.SECURE_PAGE());
    await use(new SecurePage(page));
  },
  inputPage: async ({ page }, use) => {
    await page.goto(PageUrls.INPUT_PAGE());
    await use(new InputPage(page));
  },
  uploadPage: async ({ page }, use) => {
    await page.goto(PageUrls.UPLOAD_PAGE());
    await use(new UploadPracticePage(page));
  },
  hoverPage: async ({ page }, use) => {
    await page.goto(PageUrls.HOVER_PAGE());
    await use(new HoverPage(page));
  },
  dropdownPage: async ({ page }, use) => {
    await page.goto(PageUrls.DROPDOWN_PAGE());
    await use(new DropdownPage(page));
  },
  checkboxesPage: async ({ page }, use) => {
    await page.goto(PageUrls.CHECKBOXES_PAGE());
    await use(new CheckboxesPage(page));
  },
  radioButtonsPage: async ({ page }, use) => {
    await page.goto(PageUrls.RADIO_BUTTONS_PAGE());
    await use(new RadioButtonsPage(page));
  },
  jsDialogsPage: async ({ page }, use) => {
    await page.goto(PageUrls.JS_DIALOGS_PAGE());
    await use(new JsDialogsPage(page));
  },
  dynamicTablePage: async ({ page }, use) => {
    await page.goto(PageUrls.DYNAMIC_TABLE_PAGE());
    await use(new DynamicTablePage(page));
  },
  addRemoveElementsPage: async ({ page }, use) => {
    await page.goto(PageUrls.ADD_REMOVE_ELEMENTS_PAGE());
    await use(new AddRemoveElementsPage(page));
  },
});

export { expect };
