# Playwright Demo Framework

A senior-level end-to-end test automation framework built with [Playwright](https://playwright.dev/) and TypeScript. The goal of this project is to demonstrate and practice real-world QA automation patterns: Page Object Model, typed constants, API testing, and advanced UI interactions.

Tests run against publicly available practice sites:

- [practice.expandtesting.com](https://practice.expandtesting.com)
- [the-internet.herokuapp.com](https://the-internet.herokuapp.com)
- [commitquality.com](https://commitquality.com)

## Features

- Page Object Model (POM) — every page has a dedicated class, no raw locators in tests
- Typed constants for URLs, labels, timeouts, and HTTP status codes
- UI tests: login/logout, hover, file upload, drag-and-drop, dynamic loading, input fields
- API tests using Playwright's request context
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
│   ├── timeouts.ts              # Named timeout values
│   └── *-page-labels.ts        # Page titles, button labels, alert messages
├── pages/                       # Page Object Model classes
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
