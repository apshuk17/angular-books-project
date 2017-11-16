import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { SearchInterfaceComponent } from './search/search-interface/search-interface.component';
import { RecentBooksComponent } from './books/recent-books/recent-books.component';
import { BookDetailComponent } from './books/book-detail/book-detail.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { AuthGuardService } from './services/auth-guard.service';

const APP_ROUTES: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'home', canActivate: [AuthGuardService], component: HomeComponent },
  { path: 'add-new-books', canActivate: [AuthGuardService], component: SearchInterfaceComponent },
  // { path: 'home/:uid', canActivate: [AuthGuardService], component: HomeComponent, children: [
  //   { path: 'add-new-book', component: SearchInterfaceComponent },
  //   { path: 'book-detail/:id', component: BookDetailComponent }
  // ] },
  { path: 'not-found', component: PageNotFoundComponent },
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: '**', redirectTo: '/not-found', pathMatch: 'full'}
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot(APP_ROUTES)
  ],
  declarations: [],
  exports: [RouterModule]
})
export class AppRoutingModule { }
