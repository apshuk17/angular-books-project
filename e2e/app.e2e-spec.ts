import { AngularBooksProjectPage } from './app.po';

describe('angular-books-project App', () => {
  let page: AngularBooksProjectPage;

  beforeEach(() => {
    page = new AngularBooksProjectPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
