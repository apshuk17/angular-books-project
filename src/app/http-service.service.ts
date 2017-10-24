import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';

import 'rxjs/add/operator/map';

@Injectable()
export class HttpServiceService {

  constructor(private http: Http) {}

  getAdminData(term: string) {
    return this.http.get('https://www.googleapis.com/books/v1/volumes?q=' + term + '&startIndex=0&maxResults=20')
                        .map((res: Response) => res.json());
  }

  checkData() {
    console.log('Check service method');
  }

}
