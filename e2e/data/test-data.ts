/**
 * Centralized, non-secret test data (form values, selections, counts).
 *
 * Credentials NEVER live here — they are loaded from `.env` via `process.env`
 * (see CLAUDE.md security rules). This file holds only values that are safe to
 * commit and shared across specs to keep tests DRY.
 */
export const TestData = {
  /** Visible label of the dropdown option selected in the dropdown test. */
  DROPDOWN_OPTION: "Option 2",

  /** `value`/`id` of the radio inputs exercised in the radio-buttons test. */
  RADIO_COLOR: "black",
  RADIO_SPORT: "football",

  /** Text typed into the JavaScript prompt dialog. */
  PROMPT_TEXT: "Playwright was here",

  /** Number of rows created in the add/remove-elements test. */
  ELEMENTS_TO_ADD: 3,

  /** Process whose CPU value is verified against the table in the dynamic-table test. */
  TABLE_PROCESS: "Chrome",

  /** Values entered into the inputs page. */
  INPUT_FIELDS: {
    NUMBER: "12345",
    TEXT: "Test input",
    PASSWORD: "password123",
    DATE: "2024-01-01",
  },
};
