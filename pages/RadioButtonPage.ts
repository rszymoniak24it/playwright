// pages/RadioButtonPage.ts
import { Page, Locator, expect } from '@playwright/test';

export class RadioButtonPage {
  readonly page: Page;
  readonly url: string = 'https://demoqa.com/radio-button';

  // Selectors
  readonly yesRadio: Locator;
  readonly impressiveRadio: Locator;
  readonly output: Locator;

  constructor(page: Page) {
    this.page = page;
    this.yesRadio = page.locator('.custom-radio label[for="yesRadio"]');
    this.impressiveRadio = page.locator('.custom-radio label[for="impressiveRadio"]');
    this.output = page.locator('.text-success');
  }

  // Navigation method
  async goto() {
    await this.page.goto(this.url);
    await this.page.waitForLoadState('domcontentloaded');
  }

  // Method to select the "Yes" radio button
  async selectYes() {
    await this.yesRadio.click();
  }

  // Method to select the "Impressive" radio button
  async selectImpressive() {
    await this.impressiveRadio.click();
  }

  // Method to check if the correct radio button is selected
  async verifyRadioSelection(expectedText: string) {
    await expect(this.output).toHaveText(expectedText);
  }

  // Method to verify that the "Yes" radio button is checked
  async verifyYesChecked() {
    await expect(this.yesRadio).toBeChecked();
  }

  // Method to verify that the "Impressive" radio button is checked
  async verifyImpressiveChecked() {
    await expect(this.impressiveRadio).toBeChecked();
  }
}