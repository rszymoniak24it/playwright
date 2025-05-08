import { Page, Locator, expect } from '@playwright/test';

export class WebTablesPage {
  readonly page: Page;
  readonly addButton: Locator;
  readonly modal: Locator;
  readonly inputs: {
    firstName: Locator;
    lastName: Locator;
    email: Locator;
    age: Locator;
    salary: Locator;
    department: Locator;
  };
  readonly submitButton: Locator;
  readonly searchBox: Locator;
  readonly tableRows: Locator;
  readonly noRowsText: Locator;
  readonly formFields: Locator;

  constructor(page: Page) {
    this.page = page;
    this.addButton = page.locator('#addNewRecordButton');
    this.modal = page.locator('.modal-content');
    this.inputs = {
      firstName: page.locator('#firstName'),
      lastName: page.locator('#lastName'),
      email: page.locator('#userEmail'),
      age: page.locator('#age'),
      salary: page.locator('#salary'),
      department: page.locator('#department'),
    };
    this.submitButton = page.locator('#submit');
    this.searchBox = page.locator('#searchBox');
    this.tableRows = page.locator('.rt-tbody .rt-tr-group');
    this.noRowsText = page.locator('.rt-noData');
  }

  async goto() {
    await this.page.goto('https://demoqa.com/webtables');
    await this.page.waitForLoadState('domcontentloaded');
  }

  async addRecord(user: {
    firstName: string;
    lastName: string;
    email: string;
    age: string;
    salary: string;
    department: string;
  }) {
    await this.addButton.click();
    await expect(this.modal).toBeVisible();
    await this.inputs.firstName.fill(user.firstName);
    await this.inputs.lastName.fill(user.lastName);
    await this.inputs.email.fill(user.email);
    await this.inputs.age.fill(user.age);
    await this.inputs.salary.fill(user.salary);
    await this.inputs.department.fill(user.department);
    await this.submitButton.click();
    await expect(this.modal).toBeHidden();
  }
  
  async submitEmptyForm() {
    await this.addButton.click();
    await expect(this.modal).toBeVisible();
    await this.submitButton.click();
    
    const invalidFields = await this.modal.locator(':invalid').count();
    await expect(invalidFields).toBeGreaterThan(0);
    await expect(this.modal).toBeVisible();
  }

  async searchByEmail(email: string): Promise<Locator> {
    await this.searchBox.fill(email);
    return this.tableRows.filter({ hasText: email });
  }

  async editDepartment(row: Locator, newDepartment: string) {
    await row.locator('[title="Edit"]').click();
    await expect(this.modal).toBeVisible();
    await this.inputs.department.fill(newDepartment);
    await this.submitButton.click();
    await expect(this.modal).toBeHidden();
  }

  async deleteRow(row: Locator) {
    await row.locator('[title="Delete"]').click();
  }
}
