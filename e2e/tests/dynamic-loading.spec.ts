import { test, expect } from '@playwright/test';

test('heroku dynamic loading', async ({ page }) => {
  await page.goto('https://the-internet.herokuapp.com/dynamic_loading/1');
  await page.getByRole('button', { name: 'Start' }).click();
  await expect(page.locator('#loading').getByRole('img')).toBeVisible();
  await expect(page.getByRole('heading', { name: 'Hello World!' })).toBeVisible({ timeout: 6000 });

});

test('commit quailty dynamic loading', async ({ page }) => {
  await page.goto('https://commitquality.com/practice-dyanmic-text');
  await page.getByRole('button', { name: 'Always visible' }).click();
  await expect(page.getByRole('button', { name: 'loading' })).toBeVisible();
  await expect(page.getByRole('button', { name: 'I am visible after 5 seconds' })).toBeVisible({ timeout: 6000 });

});
