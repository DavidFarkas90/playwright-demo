import { test, expect } from "../../fixtures/api.fixture.js";
import { HttpStatusCodes } from "../../constants/http-status-codes.js";
import { TestData } from "../../data/test-data.js";

test.describe("JSONPlaceholder API tests", () => {
  for (const USER of TestData.API.USERS) {
    test(`GET user with id ${USER.id} and verify name and username in response`, async ({
      usersApi,
    }) => {
      let responseBody: Record<string, unknown> = {};

      await test.step(`Send GET request for user ${USER.id} and verify HTTP 200 status`, async () => {
        const response = await usersApi.getUser(USER.id);
        expect(response.ok()).toBeTruthy();
        expect(response.status()).toBe(HttpStatusCodes.OK);
        responseBody = await response.json();
      });

      await test.step(`Verify response body contains name '${USER.name}' and username '${USER.username}'`, async () => {
        expect(responseBody).toHaveProperty("name", USER.name);
        expect(responseBody.username).toEqual(USER.username);
      });
    });
  }

  test("GET a non-existent user returns HTTP 404", async ({ usersApi }) => {
    await test.step("Send GET request for a missing user and verify HTTP 404 status", async () => {
      const response = await usersApi.getUser(TestData.API.MISSING_USER_ID);
      expect(response.ok()).toBeFalsy();
      expect(response.status()).toBe(HttpStatusCodes.NOT_FOUND);
    });
  });

  test("Create a new post and verify the response contains the correct id and title", async ({
    usersApi,
  }) => {
    let responseBody: Record<string, unknown> = {};

    await test.step("Send POST request with post data", async () => {
      const newPostResponse = await usersApi.createPost(TestData.API.NEW_POST);
      expect(newPostResponse.ok()).toBeTruthy();
      expect(newPostResponse.status()).toBe(HttpStatusCodes.CREATED);
      responseBody = await newPostResponse.json();
    });

    await test.step("Verify the created post has the expected id and title", async () => {
      expect(responseBody.id).toEqual(TestData.API.CREATED_POST_ID);
      expect(responseBody.title).toEqual(TestData.API.NEW_POST.title);
    });
  });
});
