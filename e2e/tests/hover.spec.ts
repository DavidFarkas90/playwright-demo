import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('https://the-internet.herokuapp.com/hovers');
  await page.getByRole('img', { name: 'User Avatar' }).first().hover();
  await expect(page.getByRole('heading', { name: 'name: user1' })).toBeVisible();
  await expect(page.getByRole('link', { name: 'View profile' })).toHaveAttribute("href", "/users/1");
});