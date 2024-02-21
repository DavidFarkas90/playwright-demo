import { test, expect } from '@playwright/test';


const URL = "https://jsonplaceholder.typicode.com";
const TITLE = "Testing posts";

test('GET users', async ({ request }) => {

    const response = await request.get(`${URL}/users/1`);
    expect(response).toBeTruthy();
    expect(response.ok()).toBeTruthy();
    expect(response.status()).toBe(200);
    const responseBody = await response.json();
    expect(responseBody).toHaveProperty("name", "Leanne Graham");
    expect(responseBody.username).toEqual("Bret");


});

test('Create new post', async ({ request }) => {
    const newUserResponse = await request.post(`${URL}/posts`, {
        data: {
            title: TITLE,
            body: 'this is my body',
            userId: 1
        }
    });
    expect(newUserResponse.ok()).toBeTruthy();
    const responseBody = await newUserResponse.json();
    expect(responseBody.id).toEqual(101);
    expect(responseBody.title).toEqual(TITLE);

});
