import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { DbFirebaseService } from '../services/db-firebase.service';
import { HttpServiceService } from '../services/http-service.service';
import { Book } from '../books/book';

import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {

  selectedCategory = 'All';
  booksCollection$: Observable<Book[]>;
  bookCategories$: Observable<string[]>;
  paginationCount$: Observable<number[]>;

  constructor(private dbFirebase: DbFirebaseService,
              private httpService: HttpServiceService) { }

  getBooks(pageIndex: number, booksToDisplay: number = 12): Observable<Book[]> {
    return this.booksCollection$ = this.dbFirebase.getBooks().map(books => {
      const totalBooks = books.length;
      const beginIndex = (pageIndex - 1) * booksToDisplay;
      const endIndex = (beginIndex + booksToDisplay) < totalBooks ? (beginIndex + booksToDisplay) : totalBooks;
      return books.slice(beginIndex, endIndex);
    });
  }

  getBookCategories(): Observable<string[]> {
    return this.bookCategories$ = this.dbFirebase.getCategories();
  }

  getBooksByCategory(category: string): Observable<Book[]> {
    this.selectedCategory = category;
    if (category === 'All') {
      return this.getBooks(1);
    } else {
      return this.booksCollection$ = this.dbFirebase.getBooksByCategory(category);
    }
  }

  ngOnInit() {
    this.getBooks(1);
    this.getBookCategories();
    this.paginationCount$ = this.dbFirebase.getPagination().map(count => {
      const paginationColl = [];
      for (let i = 0; i <= count - 1; i++) {
        paginationColl.push(i + 1);
      }
      return paginationColl;
    });

    // show signout option
    this.httpService.signOut.next(true);
  }

  ngOnDestroy() {

  }

}
