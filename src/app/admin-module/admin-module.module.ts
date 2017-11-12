import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchInterfaceComponent } from './search-interface/search-interface.component';
import { SearchResultComponent } from './search-result/search-result.component';
import { AdminServiceService } from './admin-service.service';
import { RecentBooksComponent } from './recent-books/recent-books.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [SearchInterfaceComponent, 
                 SearchResultComponent, 
                 RecentBooksComponent
    ],
  exports: [SearchInterfaceComponent,
            RecentBooksComponent
  ],
  providers: [AdminServiceService]
})
export class AdminModuleModule { }
