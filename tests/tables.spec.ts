import { test, expect } from '@playwright/test';
import { WebTablesPage } from '../pages/WebTablesPage';

const testUser = {
  firstName: 'Alice',
  lastName: 'Johnson',
  email: 'alice.johnson@example.com',
  age: '29',
  salary: '85000',
  department: 'QA',
};

test.describe('WebTables tests', () => {
  test('Add new record', async ({ page }) => {
    const webTables = new WebTablesPage(page);
    await webTables.goto();
    await webTables.addRecord(testUser);

    const newRow = await webTables.searchByEmail(testUser.email);
    await expect(newRow).toContainText(testUser.department);
  });

  test('Trigger validation', async ({ page }) => {
    const webTables = new WebTablesPage(page);
    await webTables.goto();
    await webTables.submitEmptyForm();
  });

  test('Search record by email', async ({ page }) => {
    const webTables = new WebTablesPage(page);
    await webTables.goto();
    await webTables.addRecord(testUser);

    const row = await webTables.searchByEmail(testUser.email);
    await expect(row).toContainText(testUser.firstName);
  });

  test('✏️ Edit record department', async ({ page }) => {
    const webTables = new WebTablesPage(page);
    await webTables.goto();
    await webTables.addRecord(testUser);

    const row = await webTables.searchByEmail(testUser.email);
    await webTables.editDepartment(row, 'Automation QA');

    const updatedRow = await webTables.searchByEmail(testUser.email);
    await expect(updatedRow).toContainText('Automation QA');
  });

  test('Delete record', async ({ page }) => {
    const webTables = new WebTablesPage(page);
    await webTables.goto();
    await webTables.addRecord(testUser);
    
    const row = await webTables.searchByEmail(testUser.email);
    await webTables.deleteRow(row);

    await expect(webTables.noRowsText).toHaveText('No rows found');
  });
});