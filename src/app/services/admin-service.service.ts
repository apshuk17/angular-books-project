import { Injectable } from '@angular/core';

@Injectable()
export class AdminServiceService {

  selectedBooks = [];

  constructor() { }

  addSelectedBook(book) {
    this.selectedBooks.push(book);
  }

  removeSelectedBook(book) {
    const bookIndex = this.selectedBooks.indexOf(book);
    this.selectedBooks.splice(bookIndex, 1);
  }

}
