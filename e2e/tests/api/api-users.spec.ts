import { test, expect } from "@playwright/test";
import { ApiUrls } from "../../constants/api-urls.js";
import { HttpStatusCodes } from "../../constants/http-status-codes.js";

const TITLE = "Testing posts";

const USERS = [
  {
    id: 1,
    name: "Leanne Graham",
    username: "Bret",
  },
  {
    id: 2,
    name: "Ervin Howell",
    username: "Antonette",
    email: "Shanna@melissa.tv",
  },
  {
    id: 3,
    name: "Clementine Bauch",
    username: "Samantha",
    email: "Nathan@yesenia.net",
  },
  {
    id: 4,
    name: "Patricia Lebsack",
    username: "Karianne",
    email: "Julianne.OConner@kory.org",
  },
];

test.describe("JSONPlaceholder API tests", () => {
  for (const USER of USERS) {
    test(`GET user with id ${USER.id} and verify name and username in response`, async ({
      request,
    }) => {
      let responseBody: Record<string, unknown> = {};

      await test.step(`Send GET request for user ${USER.id} and verify HTTP 200 status`, async () => {
        const response = await request.get(`${ApiUrls.JSON_PLACEHOLDER_BASE}/users/${USER.id}`);
        expect(response).toBeTruthy();
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

  test("Create a new post and verify the response contains the correct id and title", async ({
    request,
  }) => {
    let responseBody: Record<string, unknown> = {};

    await test.step("Send POST request with post data", async () => {
      const newUserResponse = await request.post(`${ApiUrls.JSON_PLACEHOLDER_BASE}/posts`, {
        data: {
          title: TITLE,
          body: "this is my body",
          userId: 1,
        },
      });
      expect(newUserResponse.ok()).toBeTruthy();
      responseBody = await newUserResponse.json();
    });

    await test.step("Verify the created post has the expected id and title", async () => {
      expect(responseBody.id).toEqual(101);
      expect(responseBody.title).toEqual(TITLE);
    });
  });
});
