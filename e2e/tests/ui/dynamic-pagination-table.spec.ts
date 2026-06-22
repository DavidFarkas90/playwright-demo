import { test, expect } from "../../fixtures/pages.fixture.js";
import { TestData } from "../../data/test-data.js";

const PAGINATION = TestData.PAGINATION_TABLE;

test.describe("Dynamic pagination table tests", () => {
  test("Default page shows the default number of rows", async ({ dynamicPaginationTablePage }) => {
    await test.step("Verify the page loaded", async () => {
      await expect(dynamicPaginationTablePage.pageTitle).toBeVisible();
    });

    await test.step("Verify the default row count and first student", async () => {
      await expect(dynamicPaginationTablePage.dataRows).toHaveCount(PAGINATION.DEFAULT_PAGE_SIZE);
      await expect(dynamicPaginationTablePage.firstStudentName).toHaveText(
        PAGINATION.PAGE_ONE_FIRST_STUDENT,
      );
    });
  });

  test("Selecting the 'all' page size shows every student", async ({
    dynamicPaginationTablePage,
  }) => {
    await test.step("Select the 'all' page size", async () => {
      await dynamicPaginationTablePage.selectPageSize(PAGINATION.ALL_PAGE_SIZE);
    });

    await test.step("Verify all students are shown", async () => {
      await expect(dynamicPaginationTablePage.dataRows).toHaveCount(PAGINATION.TOTAL_STUDENTS);
    });
  });

  test("Searching filters the table to the matching row", async ({
    dynamicPaginationTablePage,
  }) => {
    await test.step("Search for a student", async () => {
      await dynamicPaginationTablePage.search(PAGINATION.SEARCH_TERM);
    });

    await test.step("Verify only the matching row is shown", async () => {
      await expect(dynamicPaginationTablePage.dataRows).toHaveCount(1);
      await expect(dynamicPaginationTablePage.firstStudentName).toHaveText(PAGINATION.SEARCH_MATCH);
    });
  });

  test("Navigating to page two shows the next set of students", async ({
    dynamicPaginationTablePage,
  }) => {
    await test.step("Verify the first page has loaded", async () => {
      // Ensures the table data has rendered (and pagination handlers attached)
      // before clicking, so the anchor doesn't trigger a default navigation.
      await expect(dynamicPaginationTablePage.firstStudentName).toHaveText(
        PAGINATION.PAGE_ONE_FIRST_STUDENT,
      );
    });

    await test.step("Go to page two", async () => {
      await dynamicPaginationTablePage.goToPage(PAGINATION.PAGE_TWO);
    });

    await test.step("Verify the first student on page two", async () => {
      await expect(dynamicPaginationTablePage.firstStudentName).toHaveText(
        PAGINATION.PAGE_TWO_FIRST_STUDENT,
      );
    });
  });
});
