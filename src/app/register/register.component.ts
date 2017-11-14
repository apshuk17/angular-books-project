import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthFirebaseService } from '../services/auth-firebase.service';
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
              private router: Router) { }

  signUp() {
    const formValue = this.signupForm.value;
    this.authFirebaseService.signUpWithEmail(formValue.email, formValue.passwords.password).subscribe(res => {
      console.log(res);
      if (res.uid) {
        alert('User is successfully added');
        this.signupForm.reset();
        this.router.navigate(['/home']);
      } else {
        alert(res.message);
      }
     },
      err => console.log(err)
    );
  }

  ngOnInit() {
    this.signupForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      passwords: this.fb.group({
        password: ['', Validators.required],
        confirmPassword: ['', Validators.required]
      },
      { validator: PasswordValidation.MatchPassword}
      )
    });
  }

}
