import { Component, OnInit } from '@angular/core';
import { AuthFirebaseService } from '../services/auth-firebase.service';

import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import * as firebase from 'firebase/app';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  user = null;

  constructor(private authFirebaseService: AuthFirebaseService,
              private afd: AngularFireDatabase ) { }

  loginWithFacebook() {
    this.authFirebaseService.loginWithFacebook();
  }

  ngOnInit() {
    this.authFirebaseService.getAuthState().subscribe(user => this.user = user);
  }

}
