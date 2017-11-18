import { Injectable } from '@angular/core';
import { AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2/database';
import { Book } from '../books/book';
import { Observable } from 'rxjs/Observable';

import * as _ from 'lodash';

@Injectable()
export class DbFirebaseService {

  book: Book;

  bookCategories: string[] = [];

  books$: FirebaseListObservable<any[]> = this.afd.list('books');

  constructor(private afd: AngularFireDatabase) { }

  getBook(book): Book {
    return new Book( book.id,
             book.$key,
             book.volumeInfo.title,
             book.volumeInfo.description,
             book.volumeInfo.imageLinks,
             book.volumeInfo.publisher,
             book.volumeInfo.authors,
             book.volumeInfo.categories,
             book.accessInfo.webReaderLink,
             book.volumeInfo.publishedDate,
             book.volumeInfo.averageRating
            );
  }

  getRecentBooks(): Observable<Book[]> {
    return this.books$.map(books => {
      return _.takeRight(books, 12).map(book => {
        return this.getBook(book);
      });
    });
  }

  getBooks(): Observable<Book[]> {
    return this.books$.map(books => {
      return books.map(book => {
        return this.getBook(book);
      });
    });
  }

  getPagination(): Observable<number> {
    return this.getBooks().map(books => {
      return Math.ceil(books.length / 12);
    });
  }

  getCategories(): Observable<string[]> {
    return this.books$.map(books => {
      books.forEach(book => {
        const diffArray = _.difference(book.volumeInfo.categories, this.bookCategories);
        if (diffArray.length) {
          this.bookCategories.push( ...diffArray);
        }
      });
      this.bookCategories.unshift('All');
      return this.bookCategories;
    });
  }

  getBooksByCategory(category: string): Observable<Book[]> {
    return this.getBooks().map(books => {
      const selectedBooks: Book[] = [];
      books.map(book => {
        if (book.$categories) {
          book.$categories.forEach(bookCategory => {
            if (bookCategory === category) {
              selectedBooks.push(book);
            }
          });
        }
      });
      return selectedBooks;
    });
  }
}