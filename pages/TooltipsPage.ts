import { Page, Locator, expect } from '@playwright/test';

export class ToolTipsPage {
  readonly page: Page;
  readonly url = 'https://demoqa.com/tool-tips';

  readonly buttonHover: Locator;
  readonly textFieldHover: Locator;
  readonly linkHover: Locator;
  readonly tooltip: Locator;

  constructor(page: Page) {
    this.page = page;
    this.buttonHover = page.locator('#toolTipButton');
    this.textFieldHover = page.locator('#toolTipTextField');
    this.linkHover = page.locator('a:has-text("Contrary")');
    this.tooltip = page.locator('.tooltip-inner');
  }

  async goto() {
    await this.page.goto(this.url);
    await this.page.waitForLoadState('domcontentloaded');
  }

  async hoverAndCheckTooltip(target: Locator, expectedText: string) {
    await target.hover();
    const visibleTooltip = this.page.locator('.tooltip-inner:visible').first();
    await expect(visibleTooltip).toHaveText(expectedText);
  }
}
