/**
 * Path (relative to the project root) where the authenticated browser storage
 * state is persisted by `auth.setup.ts` and reused by authenticated specs via
 * `test.use({ storageState: AUTH_STORAGE_STATE })`.
 */
export const AUTH_STORAGE_STATE = "playwright/.auth/user.json";
