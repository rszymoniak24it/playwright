import { Page, Locator, expect } from '@playwright/test';
import * as path from 'path';

export class UploadDownloadPage {
  readonly page: Page;
  readonly url = 'https://demoqa.com/upload-download';

  readonly uploadInput: Locator;
  readonly uploadResult: Locator;
  readonly downloadButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.uploadInput = page.locator('#uploadFile');
    this.uploadResult = page.locator('#uploadedFilePath');
    this.downloadButton = page.locator('#downloadButton');
  }

  async goto() {
    await this.page.goto(this.url);
    await this.page.waitForLoadState('domcontentloaded');
  }

  async uploadFile(fileName: string) {
    const filePath = path.resolve(__dirname, `../test-data/${fileName}`);
    await this.uploadInput.setInputFiles(filePath);
  }

  async verifyUploadedFileName(fileName: string) {
    await expect(this.uploadResult).toContainText(fileName);
  }

  async downloadFile() {
    const [download] = await Promise.all([
      this.page.waitForEvent('download'),
      this.downloadButton.click()
    ]);
    const savePath = path.resolve(__dirname, `../downloads/${await download.suggestedFilename()}`);
    await download.saveAs(savePath);
    return savePath;
  }
}