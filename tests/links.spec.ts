// links.spec.ts
import { test } from '@playwright/test';
import { LinksPage } from '../pages/LinksPage';

test.describe('Links Page Tests', () => {
  test('Valid link opens home in new tab', async ({ page }) => {
    const links = new LinksPage(page);
    await links.goto();
    await links.clickLinkAndCheckNewTab(links.homeLink, 'demoqa.com');
  });

  test('Dynamic link opens home in new tab', async ({ page }) => {
    const links = new LinksPage(page);
    await links.goto();
    await links.clickLinkAndCheckNewTab(links.dynamicHomeLink, 'demoqa.com');
  });

  test('API link returns 201 Created', async ({ page }) => {
    const links = new LinksPage(page);
    await links.goto();
    await links.checkStatus(links.createdLink, 201);
  });

  test('API link returns 204 No Content', async ({ page }) => {
    const links = new LinksPage(page);
    await links.goto();
    await links.checkStatus(links.noContentLink, 204);
  });

  test('API link returns 301 Moved', async ({ page }) => {
    const links = new LinksPage(page);
    await links.goto();
    await links.checkStatus(links.movedLink, 301);
  });

  test('API link returns 400 Bad Request', async ({ page }) => {
    const links = new LinksPage(page);
    await links.goto();
    await links.checkStatus(links.badRequestLink, 400);
  });

  test('API link returns 401 Unauthorized', async ({ page }) => {
    const links = new LinksPage(page);
    await links.goto();
    await links.checkStatus(links.unauthorizedLink, 401);
  });

  test('API link returns 403 Forbidden', async ({ page }) => {
    const links = new LinksPage(page);
    await links.goto();
    await links.checkStatus(links.forbiddenLink, 403);
  });

  test('API link returns 404 Not Found', async ({ page }) => {
    const links = new LinksPage(page);
    await links.goto();
    await links.checkStatus(links.notFoundLink, 404);
  });
});
