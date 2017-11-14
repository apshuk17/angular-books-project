import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthFirebaseService } from '../services/auth-firebase.service';

import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import * as firebase from 'firebase/app';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;

  constructor(private fb: FormBuilder, private authFirebaseService: AuthFirebaseService) { }

  login() {
    const formValue = this.loginForm.value;
    this.loginForm.reset();
    this.authFirebaseService.loginWithEmail(formValue.email, formValue.password).subscribe(res => {
      console.log(res.uid); },
      err => console.log(err));
  }

  ngOnInit() {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

}
