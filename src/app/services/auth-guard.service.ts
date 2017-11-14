import { Injectable, OnInit, OnDestroy } from '@angular/core';
import { CanActivate } from '@angular/router/src/interfaces';
import { Router } from '@angular/router';
import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router/src/router_state';
import { HttpServiceService } from './http-service.service';

import * as firebase from 'firebase/app';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';

@Injectable()
export class AuthGuardService implements CanActivate, OnDestroy {

  firebaseUser: firebase.User;
  firebaseUserSubscription: Subscription;

  constructor(private httpService: HttpServiceService,
              private router: Router) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
              return  this.httpService.firebaseUser.map(res => {
                  if (res) {
                    return true;
                  } else {
                    this.router.navigate(['/login']);
                  }
                });
  }

  ngOnDestroy() {
    this.firebaseUserSubscription.unsubscribe();
  }

}
