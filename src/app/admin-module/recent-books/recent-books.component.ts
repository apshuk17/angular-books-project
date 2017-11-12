import { Component, OnInit } from '@angular/core';
import { DbFirebaseService } from '../../services/db-firebase.service';
import { Book } from '../../books/book';
import { Router } from '@angular/router';

import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-recent-books',
  templateUrl: './recent-books.component.html',
  styleUrls: ['./recent-books.component.css']
})
export class RecentBooksComponent implements OnInit {

  recentBooks$: Observable<Book[]>;


  constructor(private dbFirebase: DbFirebaseService, private router: Router) { }

  onClick(book: Book) {
    this.router.navigate(['/book-detail', book.$key]);
  }

  ngOnInit() {
    this.recentBooks$ = this.dbFirebase.getRecentBooks();
    //this.recentBooks$.subscribe(res => console.log(res));
    this.dbFirebase.getCategories().subscribe(console.log);
  }

}
