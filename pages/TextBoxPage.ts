import { Page, Locator, expect } from '@playwright/test';

export class TextBoxPage {
  readonly page: Page;
  readonly url: string = 'https://demoqa.com/text-box';

  readonly fullName: Locator;
  readonly email: Locator;
  readonly currentAddress: Locator;
  readonly permanentAddress: Locator;
  readonly submitButton: Locator;

  readonly outputSection: Locator;
  readonly outputName: Locator;
  readonly outputEmail: Locator;
  readonly outputCurrentAddress: Locator;
  readonly outputPermanentAddress: Locator;

  constructor(page: Page) {
    this.page = page;
    this.fullName = page.locator('#userName');
    this.email = page.locator('#userEmail');
    this.currentAddress = page.locator('#currentAddress');
    this.permanentAddress = page.locator('#permanentAddress');
    this.submitButton = page.locator('#submit');

    this.outputSection = page.locator('#output');
    this.outputName = page.locator('#name');
    this.outputEmail = page.locator('#email');
    this.outputCurrentAddress = page.locator('p#currentAddress');
    this.outputPermanentAddress = page.locator('p#permanentAddress');
  }

  async goto() {
    await this.page.goto(this.url);
    await this.page.waitForLoadState('domcontentloaded');
  }

  async submitForm({ fullName, email, currentAddress, permanentAddress }: Partial<Record<'fullName' | 'email' | 'currentAddress' | 'permanentAddress', string>>) {
    if (fullName) await this.fullName.fill(fullName);
    if (email) await this.email.fill(email);
    if (currentAddress) await this.currentAddress.fill(currentAddress);
    if (permanentAddress) await this.permanentAddress.fill(permanentAddress);
    await this.submitButton.click();
  }

  async expectOutput({
    fullName,
    email,
    currentAddress,
    permanentAddress,
  }: Partial<Record<'fullName' | 'email' | 'currentAddress' | 'permanentAddress', string>>) {
    await expect(this.outputSection).toBeVisible();
    fullName ? await expect(this.outputName).toHaveText(`Name:${fullName}`) : await expect(this.outputName).not.toBeVisible();
    email ? await expect(this.outputEmail).toHaveText(`Email:${email}`) : await expect(this.outputEmail).not.toBeVisible();
    currentAddress ? await expect(this.outputCurrentAddress).toHaveText(`Current Address :${currentAddress}`) : await expect(this.outputCurrentAddress).not.toBeVisible();
    permanentAddress ? await expect(this.outputPermanentAddress).toHaveText(`Permananet Address :${permanentAddress}`) : await expect(this.outputPermanentAddress).not.toBeVisible();
  }
}