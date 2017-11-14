import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthFirebaseService } from '../services/auth-firebase.service';
import { HttpServiceService } from '../services/http-service.service';

import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import * as firebase from 'firebase/app';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;

  constructor(private fb: FormBuilder,
              private authFirebaseService: AuthFirebaseService,
              private httpService: HttpServiceService,
              private router: Router) { }

  login() {
    const formValue = this.loginForm.value;
    this.loginForm.reset();
    this.authFirebaseService.loginWithEmail(formValue.email, formValue.password).subscribe(res => {
      if (res.uid) {
        this.httpService.firebaseUser.next(res);
        this.router.navigate(['/home', res.uid]);
      } else {
        alert('Incorrect email or password');
      }
    },
      err => console.log(err));
  }

  ngOnInit() {
    // form declaration
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });

    // no signout option
    this.httpService.signOut.next(false);

  }

}
