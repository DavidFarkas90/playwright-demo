import { test as base, expect } from "@playwright/test";
import { UsersApi } from "../services/users-api.js";

/**
 * API service fixtures.
 *
 * Mirrors the page-object fixtures for UI: each service is built from the
 * built-in `request` context and provided ready-to-use, so API specs declare
 * only the services they need and never call `request.get/post` directly or
 * repeat `new UsersApi(request)` in every test. Import `test` and `expect`
 * from this module instead of from `@playwright/test`.
 */
type ApiServices = {
  usersApi: UsersApi;
};

export const test = base.extend<ApiServices>({
  usersApi: async ({ request }, use) => {
    await use(new UsersApi(request));
  },
});

export { expect };
