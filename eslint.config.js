import js from "@eslint/js";
import tseslint from "typescript-eslint";
import playwright from "eslint-plugin-playwright";
import prettier from "eslint-config-prettier";

export default [
  {
    ignores: [
      "node_modules",
      "playwright-report",
      "test-results",
      "coverage",
      "dist",
      "prettier.config.cjs",
    ],
  },

  js.configs.recommended,

  ...tseslint.configs.recommended,

  {
    files: ["**/*.ts"],
    languageOptions: {
      parser: tseslint.parser,
      parserOptions: {
        sourceType: "module",
        // Enable type-aware linting (required by rules like no-floating-promises).
        projectService: true,
        tsconfigRootDir: import.meta.dirname,
      },
    },
    plugins: {
      "@typescript-eslint": tseslint.plugin,
      playwright,
    },
    rules: {
      // Playwright safety
      "playwright/no-focused-test": "error",
      "playwright/no-skipped-test": "warn",
      "playwright/no-conditional-in-test": "warn",
      "playwright/no-wait-for-timeout": "warn",

      // TS tweaks
      "@typescript-eslint/no-unused-vars": "warn",
      "@typescript-eslint/explicit-function-return-type": "off",
      // Catch missing `await` on promises — the most common source of test flake.
      "@typescript-eslint/no-floating-promises": "error",
    },
  },

  {
    files: ["**/*.spec.ts"],
    plugins: {
      playwright,
    },
    rules: {
      ...playwright.configs.recommended.rules,
    },
  },

  prettier,
];
