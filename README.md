# 🚀 Playwright 2-Week Practice Roadmap (Checklist)

Track your progress while building a **Senior-level Playwright automation framework**.

---

## 🗓️ Week 1 — Core Skills + Framework Setup

### 🔹 Day 1–2: Project Setup

- [x] Initialize Playwright project (`npm init playwright@latest`)
- [x] Configure TypeScript
- [x] Add ESLint + Prettier
- [ ] Customize Playwright config

---

### 🔹 Day 3–4: First Tests (Expand Testing)

- [ ] Write login test (valid)
- [ ] Write login test (invalid)
- [ ] Implement forgot password flow
- [ ] Cover form validation
- [ ] Use `getByRole`, `getByLabel`, `getByText`
- [ ] Add assertions (`toBeVisible`, etc.)

---

### 🔹 Day 5: Page Object Model (POM)

- [ ] Create `/pages` folder
- [ ] Implement `LoginPage`
- [ ] Move selectors into page objects
- [ ] Refactor tests to use POM

---

### 🔹 Day 6–7: Advanced UI Interactions

- [ ] Handle alerts & dialogs
- [ ] Implement file upload test
- [ ] Test hover interactions
- [ ] Work with tables
- [ ] Create `/utils` folder
- [ ] Add reusable helper functions

---

## 🗓️ Week 2 — Real-World + Advanced Topics

### 🔹 Day 8–9: E2E Flow (E-commerce)

- [ ] Register new user
- [ ] Login user
- [ ] Add product to cart
- [ ] Complete checkout flow

---

### 🔹 Day 10: Fixtures & Architecture

- [ ] Create `/fixtures` folder
- [ ] Implement logged-in user fixture
- [ ] Refactor tests to use fixtures

---

### 🔹 Day 11: API + UI Testing

- [ ] Intercept API requests
- [ ] Validate API responses
- [ ] Assert UI updates based on API

---

### 🔹 Day 12: Parallel Execution + CI

- [ ] Enable parallel test execution
- [ ] Add retries
- [ ] Setup GitHub Actions CI

---

### 🔹 Day 13: Reporting & Debugging

- [ ] Enable HTML reports
- [ ] Use Trace Viewer
- [ ] Capture screenshots on failure

---

### 🔹 Day 14: Final Project Polish

- [ ] Clean project structure
- [ ] Add README documentation
- [ ] Ensure all tests pass
- [ ] Prepare project for GitHub

---

## 🧠 Senior-Level Checklist

### Architecture

- [ ] Page Object Model implemented
- [ ] Fixtures used properly

### Stability

- [ ] No flaky selectors
- [ ] No `waitForTimeout`

### Maintainability

- [ ] Reusable components
- [ ] Clean folder structure

---

## 🔥 Bonus Challenges

- [ ] Implement auth reuse (`storageState`)
- [ ] Add data-driven tests
- [ ] Add visual testing
- [ ] Dockerize tests

---

## ✅ Final Goal

- [ ] Production-ready Playwright framework
- [ ] Real-world test coverage
- [ ] Portfolio-ready GitHub project
