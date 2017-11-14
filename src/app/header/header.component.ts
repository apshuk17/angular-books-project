import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpServiceService } from '../services/http-service.service';
import { AuthFirebaseService } from '../services/auth-firebase.service';
import * as firebase from 'firebase/app';

import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {

  signOut: boolean;
  signoutSubscription: Subscription;
  firebaseUserSubscription: Subscription;
  fireBaseUser: firebase.User;

  constructor(private httpService: HttpServiceService,
              private authFirebase: AuthFirebaseService) { }

  userSignOut() {
    this.authFirebase.logout();
  }

  ngOnInit() {
    this.signoutSubscription = this.httpService.signOut.subscribe(res => {
      this.signOut = res;
    });

    this.firebaseUserSubscription = this.httpService.firebaseUser.subscribe(res => {
      this.fireBaseUser = res;
    });
  }


  ngOnDestroy() {
    this.signoutSubscription.unsubscribe();
    this.firebaseUserSubscription.unsubscribe();
  }

}
