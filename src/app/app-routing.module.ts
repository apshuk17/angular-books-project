import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { SearchInterfaceComponent } from './admin-module/search-interface/search-interface.component';
import { RecentBooksComponent } from './admin-module/recent-books/recent-books.component';
import { BookDetailComponent } from './books/book-detail/book-detail.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';

const APP_ROUTES: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'add-new-book', component: SearchInterfaceComponent },
  { path: 'book-detail/:id', component: BookDetailComponent },
  { path: '', component: LoginComponent },
  { path: '**', component: HomeComponent }
]

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot(APP_ROUTES)
  ],
  declarations: [],
  exports: [RouterModule]
})
export class AppRoutingModule { }
