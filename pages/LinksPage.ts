// pages/LinksPage.ts
import { Page, Locator, expect, APIResponse } from '@playwright/test';

export class LinksPage {
  readonly page: Page;
  readonly url = 'https://demoqa.com/links';

  readonly homeLink: Locator;
  readonly dynamicHomeLink: Locator;
  readonly createdLink: Locator;
  readonly noContentLink: Locator;
  readonly movedLink: Locator;
  readonly badRequestLink: Locator;
  readonly unauthorizedLink: Locator;
  readonly forbiddenLink: Locator;
  readonly notFoundLink: Locator;

  constructor(page: Page) {
    this.page = page;
    this.homeLink = page.getByRole('link', { name: 'Home' }).first();
    this.dynamicHomeLink = page.locator('#dynamicLink');
    this.createdLink = page.locator('#created');
    this.noContentLink = page.locator('#no-content');
    this.movedLink = page.locator('#moved');
    this.badRequestLink = page.locator('#bad-request');
    this.unauthorizedLink = page.locator('#unauthorized');
    this.forbiddenLink = page.locator('#forbidden');
    this.notFoundLink = page.locator('#invalid-url');
  }

  async goto() {
    await this.page.goto(this.url);
    await this.page.waitForLoadState('domcontentloaded');
  }

  async clickLinkAndCheckNewTab(link: Locator, expectedUrlPart: string) {
    const [newPage] = await Promise.all([
      this.page.context().waitForEvent('page'),
      link.click()
    ]);
    await newPage.waitForLoadState('domcontentloaded');
    expect(newPage.url()).toContain(expectedUrlPart);
    await newPage.close();
  }

  async checkStatus(link: Locator, expectedStatus: number) {
    await link.click();
    const request = await this.page.waitForResponse((res) =>
      res.url().includes('demoqa') && res.status() === expectedStatus
    );
    expect(request.status()).toBe(expectedStatus);
  }
}
