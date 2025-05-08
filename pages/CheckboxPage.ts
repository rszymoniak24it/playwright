// pages/CheckboxPage.ts
import { Page, Locator, expect } from '@playwright/test';

export class CheckboxPage {
  readonly page: Page;
  readonly url: string = 'https://demoqa.com/checkbox';

  // Selectors
  readonly expandAllButton: Locator;
  readonly collapseAllButton: Locator;
  readonly homeToggle: Locator;
  readonly homeCheckbox: Locator;
  readonly resultContainer: Locator;
  readonly resultText: Locator;

  constructor(page: Page) {
    this.page = page;
    this.expandAllButton = page.locator('.rct-option-expand-all');
    this.collapseAllButton = page.locator('.rct-option-collapse-all');
    this.homeToggle = page.locator('.rct-node:nth-child(1) > .rct-text > .rct-collapse > .rct-icon-expand-close');
    this.homeCheckbox = page.locator('.rct-text label[for="tree-node-home"]');
    this.resultContainer = page.locator('#result');
    this.resultText = page.locator('#result span.text-success');
  }

  // Navigate to the checkbox page
  async goto() {
    await this.page.goto(this.url);
    await this.page.waitForLoadState('domcontentloaded');
  }

  // Expand all nodes
  async expandAll() {
    await this.expandAllButton.click();
  }

  // Select the "Home" checkbox
  async selectHomeCheckbox() {
    await this.homeCheckbox.click();
  }

  // Get result text
  async getResultText() {
    return this.resultText.textContent();
  }

  // Select checkbox by label text
  async selectCheckboxByLabel(label: string) {
    const checkbox = this.page.locator(`.rct-text label[for="tree-node-${label}"]`);
    await checkbox.click();
  }

  // Verify that result container is visible
  async verifyResultContainerVisible() {
    await expect(this.resultContainer).toBeVisible();
  }

  // Verify specific result text exists
  async verifyResultText(expectedText: string) {
    await expect(this.resultText.filter({ hasText: expectedText })).toBeVisible();
  }

  // Verify that the checkbox icon has a specific class
  async verifyCheckboxIconChecked(checkboxLabel: string) {
    const checkboxNode = this.page.locator(`.rct-text label[for="tree-node-${checkboxLabel}"]`);
    const checkboxIcon = checkboxNode.locator('.rct-checkbox .rct-icon');
    await expect(checkboxIcon).toHaveClass("rct-icon rct-icon-check");
  }

  // Verify that no result is visible
  async verifyNoResultVisible() {
    await expect(this.resultContainer).not.toBeVisible();
  }
}
