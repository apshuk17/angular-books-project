import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { DbFirebaseService } from '../../services/db-firebase.service';
import { Book } from '../book';

@Component({
  selector: 'app-book-item',
  templateUrl: './book-item.component.html',
  styleUrls: ['./book-item.component.css']
})
export class BookItemComponent implements OnInit {

  @Input() book;

  selected = false;

  constructor(private dbFirebase: DbFirebaseService,
              private router: Router) { }

  onClick(book: Book) {
    this.router.navigate(['/home/book-detail/', book.$key]);
  }

  onChange(event: Event) {
    this.selected = !this.selected;
  }

  onRemove(book: Book) {
    this.dbFirebase.removeBook(book);
  }

  ngOnInit() {
  }

}
