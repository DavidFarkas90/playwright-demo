import { test, expect } from '@playwright/test';

test('GET users', async ({ request }) => {

    const response = await request.get("https://jsonplaceholder.typicode.com/users/1");
    expect(response).toBeTruthy();
    expect(response.ok()).toBeTruthy();
    expect(response.status()).toBe(200);
    const responseBody = await response.json();
    expect(responseBody).toHaveProperty("name", "Leanne Graham");
    expect(responseBody.username).toEqual("Bret");


});
