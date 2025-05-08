// pages/BooksPage.ts
import { Page, APIRequestContext, expect, Locator } from '@playwright/test';

export class BooksPage {
  readonly page: Page;
  readonly request: APIRequestContext;
  readonly url = 'https://demoqa.com/books';
  readonly paginationDropdown: Locator;
  readonly nextButton: Locator;

  constructor(page: Page, request: APIRequestContext) {
    this.page = page;
    this.request = request;
    this.paginationDropdown = page.locator('select[aria-label="rows per page"]');
    this.nextButton = page.getByRole('button', { name: 'Next' });
  }

  async goto() {
    await this.page.goto(this.url);
    await this.page.waitForLoadState('domcontentloaded');
  }

  async getBooksFromApi() {
    const response = await this.request.get('https://demoqa.com/BookStore/v1/Books');
    expect(response.ok()).toBeTruthy();

    const data = await response.json();
    return data.books;
  }

  async countBooks(count: number) {
    const books = await this.getBooksFromApi();
    expect(books.length).toEqual(count);
  }

  async countBooksByPublisher(publisherName: string) {
    const books = await this.getBooksFromApi();
    const matchingBooks = books.filter((book: { publisher: string }) =>
        book.publisher.toLowerCase() === publisherName.toLowerCase()
      );
    
      return matchingBooks.length;
    }

  async setPaginationTo(count: number) {
    await this.paginationDropdown.selectOption(count.toString());
    await this.page.waitForTimeout(100); // Small delay for UI update
  }

  async getBookTitlesOnPage(): Promise<string[]> {
    return this.page.locator('.rt-tbody .rt-tr-group .rt-td:nth-child(2)').allTextContents();
  }

  async goToNextPage() {
    await this.nextButton.click();
    await this.page.waitForTimeout(200);
  }
}
