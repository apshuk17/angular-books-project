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

  booksCollection$: Observable<Book[]>;
  paginationCount$: Observable<number[]>;
  @Input() pageIndex: number;

  constructor(private dbFirebase: DbFirebaseService,
              private httpService: HttpServiceService) { }

  onPageClick(): Observable<Book[]> {
    return this.getBooks(this.pageIndex);
  }
  getBooks(pageIndex: number, booksToDisplay: number = 12): Observable<Book[]> {
    return this.booksCollection$ = this.dbFirebase.getBooks().map(books => {
      const beginIndex = (pageIndex - 1) * booksToDisplay;
      const endIndex = beginIndex + booksToDisplay;
      return books.slice(beginIndex, endIndex);
    })
  }

  ngOnInit() {
    this.booksCollection$ = this.onPageClick();
    //this.booksCollection$.subscribe(console.log);
    this.paginationCount$ = this.dbFirebase.getPagination().map(count => {
      const paginationColl = [];
      for(let i=0; i <= count - 1; i++) {
        paginationColl.push(i+1);
      }
      return paginationColl;
    });

    // show signout option
    this.httpService.signOut.next(true);
  }

  ngOnDestroy() {
    
  }

}
