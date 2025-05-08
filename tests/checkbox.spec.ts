import { test } from '@playwright/test';
import { CheckboxPage } from '../pages/CheckboxPage';

test('User can expand checkbox tree and select Home', async ({ page }) => {
  const checkboxPage = new CheckboxPage(page);
  await checkboxPage.goto();
  
  await checkboxPage.expandAll();

  await checkboxPage.selectHomeCheckbox();

  await checkboxPage.verifyResultContainerVisible();

  const expectedSelections = [
    'home', 'desktop', 'notes', 'commands', 'documents', 'workspace', 'react', 
    'angular', 'veu', 'office', 'public', 'private', 'classified', 'general', 
    'downloads', 'wordFile', 'excelFile'
  ];

  for (const label of expectedSelections) {
    await checkboxPage.verifyResultText(label);
  }
});

test('Home checkbox icon updates when selected', async ({ page }) => {
  const checkboxPage = new CheckboxPage(page);
  await checkboxPage.goto();

  await checkboxPage.selectHomeCheckbox();

  await checkboxPage.verifyCheckboxIconChecked('home');
});

test('User selects only "Notes" checkbox and verifies output', async ({ page }) => {
  const checkboxPage = new CheckboxPage(page);
  await checkboxPage.goto();

  await checkboxPage.expandAll();

  await checkboxPage.selectCheckboxByLabel('notes');

  await checkboxPage.verifyResultText('notes');
});

test('User does not select any checkbox and verifies no output', async ({ page }) => {
  const checkboxPage = new CheckboxPage(page);
  await checkboxPage.goto();

  await checkboxPage.verifyNoResultVisible();
});
