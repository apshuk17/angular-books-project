import { Component, OnInit, OnDestroy, ViewChild, ElementRef } from '@angular/core';
import { HttpServiceService } from '../../http-service.service';

import { Subscription } from 'rxjs/Subscription';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';

@Component({
  selector: 'app-admin-interface',
  templateUrl: './admin-interface.component.html',
  styleUrls: ['./admin-interface.component.css']
})
export class AdminInterfaceComponent implements OnInit, OnDestroy {

  books$: FirebaseListObservable<any[]>;

  @ViewChild('searchValue')
  private searchValue: ElementRef;
  getSearchDataSubscription: Subscription;
  items = [];
  showComp = false;
  totalItemsFound = 0;

  constructor(private httpService: HttpServiceService,
              private afd: AngularFireDatabase) { }

  onSearch(searchValue: string) {
    if (searchValue) {
      this.getSearchDataSubscription = this.httpService.getAdminData(searchValue).subscribe(
        res => {
          this.items = res.items;
          this.totalItemsFound = res.items.length;
          this.showComp = true;
        }
      );

      // Emptying search bar
      this.searchValue.nativeElement.value = null;
    }
  }

  addNewBooks() {
    if (this.items.length) {
      this.items.forEach(item => {
        this.books$.push(item)
        .then(() => console.log('Books Added Successfully'), err => console.log(err));
      });
    }

  }

  noNewBooks() {
    this.getSearchDataSubscription.unsubscribe();
    this.items = [];
    this.totalItemsFound = 0;
    this.showComp = false;
  }

  ngOnInit() {
    this.books$ = this.afd.list('books');
  }

  ngOnDestroy() {
    this.getSearchDataSubscription.unsubscribe();
  }
}
