
import { test, expect } from '@playwright/test';
import { TextBoxPage } from '../pages/TextBoxPage';

const user = {
  fullName: 'John Doe',
  email: 'john.doe@example.com',
  currentAddress: '123 Main Street',
  permanentAddress: '456 Secondary Street',
};

test('User submits form with all fields filled', async ({ page }) => {
  const textBox = new TextBoxPage(page);
  await textBox.goto();
  await textBox.submitForm(user);
  await textBox.expectOutput(user);
});

test('⚠️ User submits form with only name and email', async ({ page }) => {
  const textBox = new TextBoxPage(page);
  await textBox.goto();
  await textBox.submitForm({ fullName: user.fullName, email: user.email });
  await textBox.expectOutput({ fullName: user.fullName, email: user.email });
});

test('⚠️ User submits form with only address fields', async ({ page }) => {
  const textBox = new TextBoxPage(page);
  await textBox.goto();
  await textBox.submitForm({ currentAddress: user.currentAddress, permanentAddress: user.permanentAddress });
  await textBox.expectOutput({ currentAddress: user.currentAddress, permanentAddress: user.permanentAddress });
});

test('User submits form with no fields filled', async ({ page }) => {
  const textBox = new TextBoxPage(page);
  await textBox.goto();
  await textBox.submitForm({});
  await expect(textBox.outputSection).not.toBeVisible();
});
