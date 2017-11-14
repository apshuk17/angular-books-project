import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthFirebaseService } from '../services/auth-firebase.service';
import { HttpServiceService } from '../services/http-service.service';
import { PasswordValidation } from '../password-validation';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  signupForm: FormGroup;

  constructor(private fb: FormBuilder,
              private authFirebaseService: AuthFirebaseService,
              private router: Router,
              private httpService: HttpServiceService) { }

  signUp() {
    const formValue = this.signupForm.value;
    this.authFirebaseService.signUpWithEmail(formValue.email, formValue.passwords.password).subscribe(res => {
      if (res.uid) {
        this.signupForm.reset();
        alert('User is successfully added');
        this.httpService.firebaseUser.next(res);
        this.router.navigate(['/home', res.uid]);
      } else {
        alert(res.message);
      }
     },
      err => console.log(err)
    );
  }

  ngOnInit() {

    // form declaration
    this.signupForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      passwords: this.fb.group({
        password: ['', Validators.required],
        confirmPassword: ['', Validators.required]
      },
      { validator: PasswordValidation.MatchPassword}
      )
    });

    // no signout option
    this.httpService.signOut.next(false);
  }

}
