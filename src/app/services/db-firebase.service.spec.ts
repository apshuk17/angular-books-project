import { TestBed, inject } from '@angular/core/testing';

import { DbFirebaseService } from './db-firebase.service';

describe('DbFirebaseService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DbFirebaseService]
    });
  });

  it('should be created', inject([DbFirebaseService], (service: DbFirebaseService) => {
    expect(service).toBeTruthy();
  }));
});
