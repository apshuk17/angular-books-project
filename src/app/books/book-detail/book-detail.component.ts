import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { Book } from '../book';
import { DbFirebaseService } from '../../services/db-firebase.service';

import { AngularFireDatabase } from 'angularfire2/database';
import 'rxjs/add/operator/take';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-book-detail',
  templateUrl: './book-detail.component.html',
  styleUrls: ['./book-detail.component.css']
})
export class BookDetailComponent implements OnInit, OnDestroy {

  book$: Observable<Book>;
  bookDetailSubscription: Subscription;


  constructor(private actRoute: ActivatedRoute,
              private router: Router,
              private dbFirebase: DbFirebaseService,
              private afd: AngularFireDatabase) {}


  ngOnInit() {
      this.bookDetailSubscription = this.actRoute.params.subscribe((res: Params) => {
          this.book$ = this.afd.object(`books/${res.id}`).map(book => {
            return this.dbFirebase.getBook(book);
        });
    });
  }

  ngOnDestroy() {
    this.bookDetailSubscription.unsubscribe();
  }

}
