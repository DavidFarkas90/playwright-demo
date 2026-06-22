# Playwright Demo Framework

A senior-level end-to-end test automation framework built with [Playwright](https://playwright.dev/) and TypeScript. The goal of this project is to demonstrate and practice real-world QA automation patterns: Page Object Model, typed constants, API testing, and advanced UI interactions.

Tests run against a publicly available practice site:

- [practice.expandtesting.com](https://practice.expandtesting.com)

## Features

- Page Object Model (POM) — every page has a dedicated class extending a shared `BasePage`, no raw locators in tests
- Typed constants for URLs, labels, and HTTP status codes, plus a centralized test-data file
- UI tests: login/logout, hover, file upload, input fields, dropdowns, checkboxes, radio buttons, JavaScript dialogs, dynamic tables, add/remove elements
- API tests using Playwright's request context, wrapped in a typed service layer
- TypeScript throughout
- ESLint + Prettier with Husky pre-commit hooks
- HTML test reports with Playwright Trace Viewer support
- GitHub Actions CI pipeline with lint and format checks before tests run

## Project Structure

```
e2e/
├── constants/
│   ├── api-urls.ts              # Base URLs for API endpoints
│   ├── http-status-codes.ts     # HTTP response status codes
│   ├── page-urls.ts             # Full URLs for UI pages
│   └── *-page-labels.ts        # Page titles, button labels, alert messages
├── data/
│   └── test-data.ts             # Centralized non-secret test data (form values, counts)
├── pages/
│   ├── base.page.ts             # Shared base class for all page objects
│   └── *.page.ts                # Page Object Model classes
├── services/
│   └── users-api.ts             # Typed service wrapper over the request context
├── tests/
│   ├── api/                     # API-level tests
│   └── ui/                      # UI end-to-end tests
```

## Prerequisites

- [Node.js](https://nodejs.org/) v18 or later (v24 recommended — used in CI)
- npm v9 or later

## Installation

```bash
# Install dependencies
npm install

# Install Playwright browsers and system dependencies
npx playwright install --with-deps
```

## Environment Variables

Some tests require credentials loaded from a `.env` file. Create one in the project root:

```
EXPAND_TESTING_USERNAME=<your-username>
EXPAND_TESTING_PASSWORD=<your-password>
```

> For CI, these values are stored as GitHub Actions secrets (`EXPAND_TESTING_USERNAME` and `EXPAND_TESTING_PASSWORD`).

## Running Tests

```bash
# Run all tests headlessly
npx playwright test

# Run in interactive UI mode (great for debugging)
npm run open:ui-mode

# Open the last HTML report
npm run open:report
```

## Code Quality

```bash
# Check and fix linting
npm run lint
npm run lint:fix

# Check and fix formatting
npm run format
npm run format:check
```

Pre-commit hooks (via Husky) automatically lint and format staged files on every commit.

## CI

GitHub Actions runs on every push and pull request to `main`. The pipeline runs lint and format checks first, then installs browsers and runs the full test suite. The HTML report is uploaded as an artifact retained for 30 days.

---

## Learning Roadmap

A structured path for learning Playwright and API testing using OOP and POM design principles.

---

### Stage 1: Playwright Fundamentals

- [x] Understand Playwright's architecture — browsers, contexts, and pages
- [x] Learn locator strategies and their priority: `getByRole` > `getByLabel` > `getByTestId` > CSS
- [x] Write basic assertions (`toBeVisible`, `toHaveText`, `toContainText`)
- [x] Understand auto-waiting and when to use explicit `{ timeout }`
- [x] Configure `playwright.config.ts` — reporters, retries, parallelism

---

### Stage 2: TypeScript for Test Automation

- [x] Type page object properties (`Page`, `Locator`)
- [x] Use `async`/`await` correctly throughout
- [x] Type method return values (`Promise<void>`, `Promise<string>`, `Promise<boolean>`)
- [x] Use `readonly` for locator properties
- [x] Use interfaces or base classes to share common page behavior

---

### Stage 3: OOP Principles Applied to Testing

- [x] **Encapsulation** — locators and selectors live only inside page objects, never in tests
- [x] **Single Responsibility** — one page object per page or component
- [x] **Separation of concerns** — actions and queries are separate methods; assertions stay in tests
- [x] **DRY** — composite methods (`login()`, `fillAllInputFields()`) eliminate repeated steps
- [x] **Inheritance / Composition** — share common behavior across page objects via a `BasePage`

---

### Stage 4: Page Object Model (POM)

- [x] Create a page object class per page (`*.page.ts`)
- [x] Declare all locators as `readonly` properties in the constructor
- [x] Write action methods (`click*`, `fill*`, `hover*`) that perform one thing
- [x] Write query methods (`get*`, `is*`) that return data without side effects
- [x] Write composite methods that combine multiple actions into a single step
- [x] Use `test.describe` + `test.beforeEach` to scope navigation and instantiation
- [x] Use `test.step()` to document multi-step flows in the HTML report

---

### Stage 5: Constants & Data Management

- [x] Extract all page URLs into `page-urls.ts`
- [x] Extract all UI labels and alert messages into `*-page-labels.ts`
- [x] Extract timeout values into `timeouts.ts`
- [x] Extract HTTP status codes into `http-status-codes.ts`
- [x] Extract API base URLs into `api-urls.ts`
- [x] Centralize test data (usernames, form values) into a dedicated data file

---

### Stage 6: API Testing

- [x] Use Playwright's `request` context for HTTP calls (no extra libraries needed)
- [x] Write GET request tests and validate response status and body
- [x] Write POST request tests and validate the created resource
- [x] Create an API layer — wrap `request` calls in typed service classes (e.g. `UsersApi`) so tests never call `request.get/post` directly, mirroring the POM pattern for UI
- [ ] Intercept and stub API requests from a UI test
- [ ] Assert that UI state updates correctly in response to an API call
- [ ] Combine API setup (create data via API) with UI verification

---

### Stage 7: Advanced Patterns

- [ ] Implement a logged-in user fixture using `test.extend` to avoid repeating login steps
- [ ] Reuse authentication state across tests with `storageState`
- [ ] Write data-driven tests using a test data array with `test.each` or a `for...of` loop
- [ ] Add visual regression tests
- [ ] Use Trace Viewer to debug failing tests
- [ ] Capture screenshots and videos on failure
- [ ] Dockerize the test suite

---

## Progress Checklist

### Week 1 — Core Skills + Framework Setup

#### Day 1–2: Project Setup

- [x] Initialize Playwright project (`npm init playwright@latest`)
- [x] Configure TypeScript
- [x] Add ESLint + Prettier
- [x] Customize Playwright config

#### Day 3–4: First Tests

- [x] Write login test (valid)
- [x] Write login test (invalid)
- [x] Write logout test
- [ ] Cover form validation
- [x] Use `getByRole`, `getByLabel`, `getByText`
- [x] Add assertions (`toBeVisible`, etc.)

#### Day 5: Page Object Model (POM)

- [x] Create `/pages` folder
- [x] Implement `LoginPage`
- [x] Move selectors into page objects
- [x] Refactor tests to use POM

#### Day 6–7: Advanced UI Interactions

- [x] Handle alerts & dialogs
- [x] Implement file upload test
- [x] Test hover interactions
- [x] Implement drag-and-drop test
- [x] Work with tables
- [ ] Add reusable helper functions

---

### Week 2 — Real-World + Advanced Topics

#### Day 8–9: E2E Flow (E-commerce)

- [ ] Register new user
- [ ] Login user
- [ ] Add product to cart
- [ ] Complete checkout flow

#### Day 10: Fixtures & Architecture

- [ ] Implement logged-in user fixture
- [ ] Refactor tests to use fixtures

#### Day 11: API + UI Testing

- [ ] Intercept API requests
- [x] Validate API responses
- [ ] Assert UI updates based on API

#### Day 12: Parallel Execution + CI

- [x] Enable parallel test execution
- [x] Add retries
- [x] Setup GitHub Actions CI

#### Day 13: Reporting & Debugging

- [x] Enable HTML reports
- [ ] Use Trace Viewer
- [ ] Capture screenshots on failure

#### Day 14: Final Project Polish

- [x] Clean project structure
- [x] Add README documentation
- [x] Ensure all tests pass
- [x] Prepare project for GitHub

---

### Senior-Level Checklist

#### Architecture

- [x] Page Object Model implemented
- [ ] Fixtures used properly

#### Stability

- [x] No flaky selectors
- [x] No `waitForTimeout`

#### Maintainability

- [x] Reusable components
- [x] Clean folder structure

---

### Final Goal

- [x] Production-ready Playwright framework
- [x] Real-world test coverage
- [x] Portfolio-ready GitHub project
