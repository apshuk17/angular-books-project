import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import * as firebase from 'firebase/app';

import { Subject } from 'rxjs/Subject';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

import 'rxjs/add/operator/map';

@Injectable()
export class HttpServiceService {

  signOut: Subject<boolean> = new Subject<boolean>();
  firebaseUser: BehaviorSubject<firebase.User> = new BehaviorSubject<firebase.User>(undefined);

  constructor(private http: Http) {
  }

  getAdminData(term: string) {
    return this.http.get('https://www.googleapis.com/books/v1/volumes?q=' + term + '&startIndex=0&maxResults=30')
                        .map((res: Response) => res.json());
  }

  checkData() {
    console.log('Check service method');
  }

}
