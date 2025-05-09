import { test } from '@playwright/test';
import { AutoCompletePage } from '../pages/AutoCompletePage';

test.describe('Auto Complete Tests', () => {
  let autoPage: AutoCompletePage;

  test.beforeEach(async ({ page }) => {
    autoPage = new AutoCompletePage(page);
    await autoPage.goto();
  });

  test('User can select multiple colors', async () => {
    await autoPage.enterMultipleColors(['Red', 'Green', 'Blue']);
    
    await autoPage.expectSelectedColors(['Red', 'Green', 'Blue']);
  });

  test('User can select a single color', async () => {
    await autoPage.enterSingleColor('Yellow');
    await autoPage.expectSingleColor('Yellow');
  });

  test('User can remove a selected color', async () => {
    await autoPage.enterMultipleColors(['Red', 'Green']);
    await autoPage.removeLastColor();
    await autoPage.expectSelectedColors(['Red']);
  });
});
