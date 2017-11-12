import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { Book } from '../book';
import { DbFirebaseService } from '../../services/db-firebase.service';

import { AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2/database';

@Component({
  selector: 'app-book-detail',
  templateUrl: './book-detail.component.html',
  styleUrls: ['./book-detail.component.css']
})
export class BookDetailComponent implements OnInit {

  bookId: Observable<string>;

  book: Book;

  book$: Observable<Book>;


  constructor(private actRoute: ActivatedRoute,
              private dbFirebase: DbFirebaseService, private afd: AngularFireDatabase) { }

  ngOnInit() {

    this.actRoute.params.subscribe((res: Params) => {
      this.afd.object(`recentBooks/${res.id}`).subscribe(book => {
        this.book = this.dbFirebase.getRecentBook(book);
      });
    });
  }

}
