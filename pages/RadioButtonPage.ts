// pages/RadioButtonPage.ts
import { Page, Locator, expect } from '@playwright/test';

export class RadioButtonPage {
  readonly page: Page;
  readonly url: string = 'https://demoqa.com/radio-button';

  readonly yesRadio: Locator;
  readonly impressiveRadio: Locator;
  readonly output: Locator;

  constructor(page: Page) {
    this.page = page;
    this.yesRadio = page.locator('.custom-radio label[for="yesRadio"]');
    this.impressiveRadio = page.locator('.custom-radio label[for="impressiveRadio"]');
    this.output = page.locator('.text-success');
  }

  async goto() {
    await this.page.goto(this.url);
    await this.page.waitForLoadState('domcontentloaded');
  }

  async selectYes() {
    await this.yesRadio.click();
  }

  async selectImpressive() {
    await this.impressiveRadio.click();
  }

  async verifyRadioSelection(expectedText: string) {
    await expect(this.output).toHaveText(expectedText);
  }

  async verifyYesChecked() {
    await expect(this.yesRadio).toBeChecked();
  }

  async verifyImpressiveChecked() {
    await expect(this.impressiveRadio).toBeChecked();
  }
}