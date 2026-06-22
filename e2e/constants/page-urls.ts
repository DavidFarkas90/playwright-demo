/**
 * Relative URL paths for the UI pages under test.
 *
 * These resolve against the `baseURL` configured in `playwright.config.ts`, so
 * navigation reads `page.goto(PageUrls.LOGIN_PAGE)` — no hardcoded host and no
 * per-entry factory function. Point the whole suite at another environment by
 * setting the `BASE_URL` env var (see the config).
 */
export const PageUrls = {
  LOGIN_PAGE: "/login",
  SECURE_PAGE: "/secure",
  UPLOAD_PAGE: "/upload",
  INPUT_PAGE: "/inputs",
  HOVER_PAGE: "/hovers",
  DROPDOWN_PAGE: "/dropdown",
  CHECKBOXES_PAGE: "/checkboxes",
  RADIO_BUTTONS_PAGE: "/radio-buttons",
  JS_DIALOGS_PAGE: "/js-dialogs",
  DYNAMIC_TABLE_PAGE: "/dynamic-table",
  DYNAMIC_PAGINATION_TABLE_PAGE: "/dynamic-pagination-table",
  ADD_REMOVE_ELEMENTS_PAGE: "/add-remove-elements",
  TOOLTIPS_PAGE: "/tooltips",
  KEY_PRESSES_PAGE: "/key-presses",
};
