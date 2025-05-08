import { test } from '@playwright/test';
import { DynamicPropertiesPage } from '../pages/DynamicPropertiesPage';

test.describe('Dynamic Properties Tests', () => {
  test('Button appears after delay', async ({ page }) => {
    const dp = new DynamicPropertiesPage(page);
    await dp.goto();
    await dp.waitForVisibleButton();
  });

  test('Button is enabled after delay', async ({ page }) => {
    const dp = new DynamicPropertiesPage(page);
    await dp.goto();
    await dp.waitForEnabledButton();
  });

  test('Button changes color after delay', async ({ page }) => {
    const dp = new DynamicPropertiesPage(page);
    await dp.goto();
    await dp.verifyColorChange();
  });

  test('Validate text with random id', async ({ page }) => {
    const dp = new DynamicPropertiesPage(page);
    await dp.goto();
    await dp.verifyRandomTextVisible();
  });
});
