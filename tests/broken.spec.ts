import { test } from '@playwright/test';
import { BrokenPage } from '../pages/BrokenPage';

test.describe('Broken Links and Images Tests', () => {
  test('Valid image loads successfully', async ({ page }) => {
    const brokenPage = new BrokenPage(page);
    await brokenPage.goto();
    await brokenPage.verifyValidImageLoads();
  });

  test('Broken image fails to load', async ({ page }) => {
    const brokenPage = new BrokenPage(page);
    await brokenPage.goto();
    await brokenPage.verifyBrokenImageFails();
  });

  test('Valid link returns 200 and redirects correctly', async ({ page }) => {
    const brokenPage = new BrokenPage(page);
    await brokenPage.goto();
    await brokenPage.verifyValidLinkNavigation();
  });

  test('Broken link returns 500 error', async ({ page }) => {
    const brokenPage = new BrokenPage(page);
    await brokenPage.goto();
    await brokenPage.verifyBrokenLinkResponse();
  });
});
