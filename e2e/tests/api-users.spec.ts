import { test, expect } from "@playwright/test";

const URL = "https://jsonplaceholder.typicode.com";
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
for (const USER of USERS) {
  test(`GET user with id: ${USER.id}`, async ({ request }) => {
    const response = await request.get(`${URL}/users/${USER.id}`);
    expect(response).toBeTruthy();
    expect(response.ok()).toBeTruthy();
    expect(response.status()).toBe(200);
    const responseBody = await response.json();
    expect(responseBody).toHaveProperty("name", `${USER.name}`);
    expect(responseBody.username).toEqual(`${USER.username}`);
  });
}

test("Create new post", async ({ request }) => {
  const newUserResponse = await request.post(`${URL}/posts`, {
    data: {
      title: TITLE,
      body: "this is my body",
      userId: 1,
    },
  });
  expect(newUserResponse.ok()).toBeTruthy();
  const responseBody = await newUserResponse.json();
  expect(responseBody.id).toEqual(101);
  expect(responseBody.title).toEqual(TITLE);
});
