// radio.spec.ts
import { test, expect } from '@playwright/test';
import { RadioButtonPage } from '../pages/RadioButtonPage';

test('User can select "Yes" and verify output', async ({ page }) => {
  const radioPage = new RadioButtonPage(page);
  
  // Go to the radio button page
  await radioPage.goto();

  // Select the "Yes" radio button
  await radioPage.selectYes();

  // Verify that the "Yes" radio button is selected
  await radioPage.verifyYesChecked();

  // Verify the output text
  await radioPage.verifyRadioSelection('Yes');
});

test('User can select "Impressive" and verify output', async ({ page }) => {
  const radioPage = new RadioButtonPage(page);
  
  // Go to the radio button page
  await radioPage.goto();

  // Select the "Impressive" radio button
  await radioPage.selectImpressive();

  // Verify that the "Impressive" radio button is selected
  await radioPage.verifyImpressiveChecked();

  // Verify the output text
  await radioPage.verifyRadioSelection('Impressive');
});