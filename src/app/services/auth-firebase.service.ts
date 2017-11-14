import { Injectable, OnInit } from '@angular/core';
import { AngularFireAuth, FirebaseAuthStateObservable } from 'angularfire2/auth';
import { HttpServiceService } from './http-service.service';
import { Router } from '@angular/router';
import * as firebase from 'firebase/app';

import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';


@Injectable()
export class AuthFirebaseService implements OnInit {

  authState = null;

  constructor(public afAuth: AngularFireAuth,
              private router: Router,
              private httpService: HttpServiceService) {
   this.afAuth.authState.subscribe(auth => {
     this.authState = auth;
   });

  }

  get isUserAnonymousLoggedIn(): boolean {
    return (this.authState !== null) ? this.authState.isAnonymous : false;
  }

  get currentUserId(): string {
    return (this.authState !== null) ? this.authState.uid : '';
  }

  get currentUserName(): string {
    return this.authState['email'];
  }

  get currentUser(): any {
    return (this.authState !== null) ? this.authState : null;
  }

  get isUserEmailLoggedIn(): boolean {
    if ((this.authState !== null) && (!this.isUserAnonymousLoggedIn)) {
      return true;
    } else {
      return false;
    }
  }

  signUpWithEmail(email: string, password: string) {
    return this.promiseToObservable(this.afAuth.auth.createUserWithEmailAndPassword(email, password));
  }

  loginWithEmail(email: string, password: string): Observable<firebase.User> {
    return this.promiseToObservable(this.afAuth.auth.signInWithEmailAndPassword(email, password));
  }

  logout() {
    this.afAuth.auth.signOut();
    this.httpService.firebaseUser.next(undefined);
    this.router.navigate(['/']);
  }

  promiseToObservable(promise): Observable<any> {
    const subject = new Subject<any>();

    promise.then(res => {
      subject.next(res);
      subject.complete();
    }, err => {
      subject.next(err);
      subject.complete();
    });

    return subject.asObservable();
  }

  ngOnInit() {
  }

}
