import { Page, expect, FrameLocator } from '@playwright/test';

export class FramesPage {
  readonly page: Page;
  readonly url = 'https://demoqa.com/frames';
  readonly frame1: FrameLocator;
  readonly frame2: FrameLocator;

  constructor(page: Page) {
    this.page = page;
    this.frame1 = page.frameLocator('#frame1');
    this.frame2 = page.frameLocator('#frame2');
  }

  async goto() {
    await this.page.goto(this.url);
    await this.page.waitForLoadState('domcontentloaded');
  }

  async expectFrameText(frame: FrameLocator, expected: string) {
    const heading = frame.locator('h1');
    await expect(heading).toBeVisible();
    await expect(heading).toHaveText(expected);
  }
}