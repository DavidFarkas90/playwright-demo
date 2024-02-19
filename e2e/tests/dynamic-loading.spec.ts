import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('https://the-internet.herokuapp.com/dynamic_loading/1');
  await page.getByRole('button', { name: 'Start' }).click();
  await expect(page.locator('#loading').getByRole('img')).toBeVisible();
  await expect(page.getByRole('heading', { name: 'Hello World!' })).toBeVisible({ timeout: 6000 });

});
