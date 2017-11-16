import { Component, OnInit, Input } from '@angular/core';
import { AdminServiceService } from '../../services/admin-service.service';

@Component({
  selector: 'app-search-result',
  templateUrl: './search-result.component.html',
  styleUrls: ['./search-result.component.css']
})
export class SearchResultComponent implements OnInit {

  @Input() book;

  selected = false;

  constructor(private adminService: AdminServiceService) {}

  onChange(event: any) {
    this.selected = !this.selected;
    event.target.checked ? this.adminService.addSelectedBook(this.book) : this.adminService.removeSelectedBook(this.book);
    console.log(this.adminService.selectedBooks);
  }

  ngOnInit() {
  }

}
