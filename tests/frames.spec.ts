import { test } from '@playwright/test';
import { FramesPage } from '../pages/FramesPage';

test('Validate content inside both frames', async ({ page }) => {
  const framesPage = new FramesPage(page);
  await framesPage.goto();

  await framesPage.expectFrameText(framesPage.frame1, 'This is a sample page');
  await framesPage.expectFrameText(framesPage.frame2, 'This is a sample page');
});
