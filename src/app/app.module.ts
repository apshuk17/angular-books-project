import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { firebaseConfig } from '../environments/firebase.config';

import { AppComponent } from './app.component';
import { RecentBooksComponent } from './books/recent-books/recent-books.component';
import { SearchInterfaceComponent } from './search/search-interface/search-interface.component';
import { SearchResultComponent } from './search/search-result/search-result.component';
import { HttpServiceService } from './services/http-service.service';
import { HeaderComponent } from './header/header.component';
import { DropdownDirective } from './directives/dropdown.directive';
import { AppRoutingModule } from './app-routing.module';
import { DbFirebaseService } from './services/db-firebase.service';
import { BookDetailComponent } from './books/book-detail/book-detail.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { AuthFirebaseService } from './services/auth-firebase.service';
import { RegisterComponent } from './register/register.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { AuthGuardService } from './services/auth-guard.service';
import { AdminServiceService } from './services/admin-service.service';
import { BookItemComponent } from './books/book-item/book-item.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    DropdownDirective,
    BookDetailComponent,
    HomeComponent,
    LoginComponent,
    RegisterComponent,
    PageNotFoundComponent,
    RecentBooksComponent,
    SearchInterfaceComponent,
    SearchResultComponent,
    BookItemComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    AppRoutingModule
  ],
  providers: [HttpServiceService,
              DbFirebaseService,
              AuthFirebaseService,
              AuthGuardService,
              AdminServiceService],
  bootstrap: [AppComponent]
})
export class AppModule { }
