// pages/ButtonsPage.ts
import { Page, Locator, expect } from '@playwright/test';

export class ButtonsPage {
  readonly page: Page;
  readonly url = 'https://demoqa.com/buttons';

  readonly doubleClickBtn: Locator;
  readonly rightClickBtn: Locator;
  readonly dynamicClickBtn: Locator;

  readonly doubleClickMsg: Locator;
  readonly rightClickMsg: Locator;
  readonly dynamicClickMsg: Locator;

  constructor(page: Page) {
    this.page = page;
    this.doubleClickBtn = page.locator('#doubleClickBtn');
    this.rightClickBtn = page.locator('#rightClickBtn');
    this.dynamicClickBtn = page.locator('button:has-text("Click Me")').nth(2); // 3rd button
    this.doubleClickMsg = page.locator('#doubleClickMessage');
    this.rightClickMsg = page.locator('#rightClickMessage');
    this.dynamicClickMsg = page.locator('#dynamicClickMessage');
  }

  async goto() {
    await this.page.goto(this.url);
    await this.page.waitForLoadState('domcontentloaded');
  }

  async performDoubleClick() {
    await this.doubleClickBtn.dblclick();
  }

  async performRightClick() {
    await this.rightClickBtn.click({ button: 'right' });
  }

  async performDynamicClick() {
    await this.dynamicClickBtn.click();
  }

  async expectDoubleClickSuccess() {
    await expect(this.doubleClickMsg).toHaveText('You have done a double click');
  }

  async expectRightClickSuccess() {
    await expect(this.rightClickMsg).toHaveText('You have done a right click');
  }

  async expectDynamicClickSuccess() {
    await expect(this.dynamicClickMsg).toHaveText('You have done a dynamic click');
  }
}
