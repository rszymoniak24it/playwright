// File: pages/BrokenPage.ts
import { Page, Locator, expect } from '@playwright/test';

export class BrokenPage {
  readonly page: Page;
  readonly url = 'https://demoqa.com/broken';

  readonly validImage: Locator;
  readonly brokenImage: Locator;
  readonly validLink: Locator;
  readonly brokenLink: Locator;

  constructor(page: Page) {
    this.page = page;
    this.validImage = page.locator('img[src="/images/Toolsqa.jpg"]');
    this.brokenImage = page.locator('img[src="/images/Toolsqa_1.jpg"]');
    this.validLink = page.getByText('Click Here for Valid Link');
    this.brokenLink = page.getByText('Click Here for Broken Link');
  }

  async goto() {
    await this.page.goto(this.url);
    await this.page.waitForLoadState('domcontentloaded');
  }

  async verifyValidImageLoads() {
    const response = await this.page.request.get('https://demoqa.com/images/Toolsqa.jpg');
    expect(response.status()).toBe(200);
  }

  async verifyBrokenImageFails() {
    const isBroken = await this.brokenImage.evaluate((img: HTMLImageElement) => {
      return img.complete && img.naturalWidth === 0;
    });
    expect(isBroken).toBe(true);
  }

  async verifyValidLinkNavigation() {
    const [response] = await Promise.all([
      this.page.waitForResponse(resp => resp.url().includes('demoqa.com') && resp.status() === 200),
      this.validLink.click()
    ]);
    expect(response.status()).toBe(200);
  }

  async verifyBrokenLinkResponse() {
    const [response] = await Promise.all([
      this.page.waitForResponse(resp => resp.url().includes('status_codes/500')),
      this.brokenLink.click()
    ]);
    expect(response.status()).toBe(500);
  }
}
