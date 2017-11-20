import { Component, OnInit, OnDestroy, ViewChild, ElementRef } from '@angular/core';
import { HttpServiceService } from '../../services/http-service.service';
import { Router } from '@angular/router';

import { Subscription } from 'rxjs/Subscription';
import { Observable} from 'rxjs/Observable';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';

import * as _ from 'lodash';
import { AdminServiceService } from '../../services/admin-service.service';

@Component({
  selector: 'app-search-interface',
  templateUrl: './search-interface.component.html',
  styleUrls: ['./search-interface.component.css']
})
export class SearchInterfaceComponent implements OnInit, OnDestroy {

  @ViewChild('searchValue')
  private searchValue: ElementRef;
  books$: FirebaseListObservable<any[]>;
  recentBooks$: FirebaseListObservable<any[]>;
  getSearchDataSubscription: Subscription;
  getBooksSubscription: Subscription;
  items = [];
  uniqueBooks = [];
  uniqueSearchBooks = [];
  selectedBooks = [];
  showComp = false;
  showSpinner = false;
  totalItemsFound? = 0;

  constructor(private httpService: HttpServiceService,
              private afd: AngularFireDatabase,
              private adminService: AdminServiceService,
              private router: Router) { }

  onSearch(searchValue: string) {
    this.showSpinner = true;
    if (searchValue) {
      this.getSearchDataSubscription = this.httpService.getAdminData(searchValue).subscribe(
        res => {
          this.items = res.items;
          if (this.items.length) {
            this.uniqueSearchBooks = this.getUniqueBooks(this.items, this.uniqueBooks);
          }
          this.showSpinner = false;
          this.showComp = true;
        }
      );

      // Emptying search bar
      this.searchValue.nativeElement.value = null;
    }
  }

  getUniqueBooks(searchedBooks, dbBooks) {
    const newBooksToBeAdded = _.differenceBy(searchedBooks, dbBooks, 'id');
    this.totalItemsFound = newBooksToBeAdded.length;
    return newBooksToBeAdded;
  }

  addBooksToDb() {
    if (this.selectedBooks.length) {
      for ( const book of this.selectedBooks ) {
        this.books$.push(book);
      }
      const confirmationMsg = this.selectedBooks.length === 1 ?
                              `${this.selectedBooks.length} book is added successfully.` :
                              `${this.selectedBooks.length} books are added successfully.`;
      alert(confirmationMsg);
      this.adminService.selectedBooks = [];
      this.uniqueSearchBooks = [];
      this.router.navigate(['/home']);
    }
  }


  ngOnInit() {
    this.books$ = this.afd.list('books');
    this.recentBooks$ = this.afd.list('recentBooks');
    this.getBooksSubscription = this.books$.subscribe(res => {
      this.uniqueBooks = _.uniqBy(res, 'id');
    });
    this.selectedBooks = this.adminService.selectedBooks;
  }

  ngOnDestroy() {
    this.getBooksSubscription.unsubscribe();
    if (this.getSearchDataSubscription) {
      this.getSearchDataSubscription.unsubscribe();
    }
  }
}
