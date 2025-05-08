// File: pages/DynamicPropertiesPage.ts
import { Page, Locator, expect } from '@playwright/test';

export class DynamicPropertiesPage {
  readonly page: Page;
  readonly url = 'https://demoqa.com/dynamic-properties';

  readonly visibleAfter5SecBtn: Locator;
  readonly enableAfterBtn: Locator;
  readonly colorChangeBtn: Locator;
  readonly randomTextParagraph: Locator;

  constructor(page: Page) {
    this.page = page;
    this.visibleAfter5SecBtn = page.locator('#visibleAfter');
    this.enableAfterBtn = page.locator('#enableAfter');
    this.colorChangeBtn = page.locator('#colorChange');
    this.randomTextParagraph = page.getByText('This text has random Id');
  }

  async goto() {
    await this.page.goto(this.url);
    await this.page.waitForLoadState('domcontentloaded');
  }

  async waitForVisibleButton() {
    await expect(this.visibleAfter5SecBtn).toBeVisible();
  }

  async waitForEnabledButton() {
    await expect(this.enableAfterBtn).toBeEnabled();
  }

  async verifyColorChange() {
    const initialClass = await this.colorChangeBtn.getAttribute('class');
    await this.page.waitForTimeout(6000); // Wait enough time for style change
    const finalClass = await this.colorChangeBtn.getAttribute('class');
    expect(initialClass).not.toBe(finalClass);
  }

  async verifyRandomTextVisible() {
    await expect(this.randomTextParagraph).toBeVisible();
    await expect(this.randomTextParagraph).toHaveText('This text has random Id');
  }
}
