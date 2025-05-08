// File: upload-download.spec.ts
import { test, expect } from '@playwright/test';
import { UploadDownloadPage } from '../pages/UploadDownloadPage';
import * as fs from 'fs';

test.describe('Upload & Download Tests', () => {
  const testFileName = 'sample.txt';

  test('User uploads a file and sees the filename', async ({ page }) => {
    const uploadPage = new UploadDownloadPage(page);
    await uploadPage.goto();
    await uploadPage.uploadFile(testFileName);
    await uploadPage.verifyUploadedFileName(testFileName);
  });

  test('User downloads a file', async ({ page }) => {
    const uploadPage = new UploadDownloadPage(page);
    await uploadPage.goto();
    const filePath = await uploadPage.downloadFile();

    const exists = fs.existsSync(filePath);
    expect(exists).toBe(true);
  });
});
