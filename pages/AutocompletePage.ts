import { expect, Locator, Page } from '@playwright/test';

export class AutoCompletePage {
  readonly page: Page;
  readonly multiColorInput: Locator;
  readonly singleColorInput: Locator;
  readonly removeButton: Locator;
  readonly selectedColors: Locator;

  constructor(page: Page) {
    this.page = page;
    this.multiColorInput = page.locator('#autoCompleteMultipleInput');
    this.singleColorInput = page.locator('#autoCompleteSingleInput');
    this.removeButton = page.locator('.auto-complete__multi-value__remove');
    this.selectedColors = page.locator('.auto-complete__multi-value__label');
  }

  async goto() {
    await this.page.goto('https://demoqa.com/auto-complete');
  }

  async enterMultipleColors(colors: string[]) {
    for (const color of colors) {
      await this.multiColorInput.fill(color);
      await this.page.locator('.auto-complete__option').first().waitFor();
      await this.multiColorInput.press('Enter');
    }
  }

  async enterSingleColor(color: string) {
    await this.singleColorInput.fill(color);
    await this.page.locator('.auto-complete__option').first().waitFor();
    await this.singleColorInput.press('Enter');
  }

  async removeLastColor() {
    await this.removeButton.last().click();
  }

  async expectSelectedColors(expected: string[]) {
    const actual = await this.selectedColors.allTextContents();
    expect(actual).toEqual(expected);
  }

  async expectSingleColor(expected: string) {
    const value = await this.page.locator('.auto-complete__single-value').textContent();
    console.log(value);
    expect(value).toContain(expected);
  }
}