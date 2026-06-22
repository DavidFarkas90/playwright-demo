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

  /** Keys pressed on the key-presses page and the upper-cased value echoed back. */
  KEY_PRESSES: [
    { press: "Tab", echoed: "TAB" },
    { press: "a", echoed: "A" },
  ],

  /** Expected values for the dynamic pagination table (10 students, alphabetical). */
  PAGINATION_TABLE: {
    DEFAULT_PAGE_SIZE: 3,
    ALL_PAGE_SIZE: "-1",
    TOTAL_STUDENTS: 10,
    SEARCH_TERM: "Alice",
    SEARCH_MATCH: "Alice Johnson",
    PAGE_ONE_FIRST_STUDENT: "Alice Johnson",
    PAGE_TWO: 2,
    PAGE_TWO_FIRST_STUDENT: "Emma Brown",
  },

  /** Data for the JSONPlaceholder API tests. */
  API: {
    /** Known users to fetch and verify (id → name/username). */
    USERS: [
      { id: 1, name: "Leanne Graham", username: "Bret" },
      { id: 2, name: "Ervin Howell", username: "Antonette" },
      { id: 3, name: "Clementine Bauch", username: "Samantha" },
      { id: 4, name: "Patricia Lebsack", username: "Karianne" },
    ],

    /** A user id that does not exist, used for the 404 negative case. */
    MISSING_USER_ID: 99999,

    /** Payload sent when creating a post. */
    NEW_POST: {
      title: "Testing posts",
      body: "this is my body",
      userId: 1,
    },

    /** JSONPlaceholder echoes a fixed id (101) for any created resource. */
    CREATED_POST_ID: 101,
  },
};
