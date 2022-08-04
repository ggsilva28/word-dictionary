import { TestBed } from '@angular/core/testing';

import { UserFavoriteApiService } from '../user-favorite-api.service';

describe('UserFavoriteApiService', () => {
  let service: UserFavoriteApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserFavoriteApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
