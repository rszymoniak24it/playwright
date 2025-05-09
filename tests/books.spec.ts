import { expect, test } from '@playwright/test';
import { BooksPage } from '../pages/BooksPage';

test.describe('Books Tests', () => {
  let booksPage: BooksPage;

  test.beforeEach(async ({ page, request }) => {
    booksPage = new BooksPage(page, request);
    await booksPage.goto();
  });

  test('Bookstore API returns 8 elements', async () => {
    await booksPage.countBooks(8);
  });

  test('Bookstore API returns 2 elements with publisher no starch press', async () => {
    const count = await booksPage.countBooksByPublisher('No Starch Press');
    expect(count).toEqual(2);
  });

  test('Pagination displays different book sets per page', async () => {
    await booksPage.setPaginationTo(5);

    const page1Books = await booksPage.getBookTitlesOnPage();

    await booksPage.goToNextPage();

    const page2Books = await booksPage.getBookTitlesOnPage();

    expect(page1Books.length).toBe(5);
    expect(page2Books.length).toBeGreaterThan(0);
    expect(page1Books).not.toEqual(page2Books);
  });
});