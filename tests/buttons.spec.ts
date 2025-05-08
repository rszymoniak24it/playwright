import { test } from '@playwright/test';
import { ButtonsPage } from '../pages/ButtonsPage';

test('User performs double click', async ({ page }) => {
  const buttons = new ButtonsPage(page);
  await buttons.goto();
  await buttons.performDoubleClick();
  await buttons.expectDoubleClickSuccess();
});

test('User performs right click', async ({ page }) => {
  const buttons = new ButtonsPage(page);
  await buttons.goto();
  await buttons.performRightClick();
  await buttons.expectRightClickSuccess();
});

test('User performs dynamic click (single click)', async ({ page }) => {
  const buttons = new ButtonsPage(page);
  await buttons.goto();
  await buttons.performDynamicClick();
  await buttons.expectDynamicClickSuccess();
});
