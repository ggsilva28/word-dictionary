import { TestBed } from '@angular/core/testing';

import { UserFavoriteApiService } from '../user-favorite-api.service';

//Services
import { RequestService } from '../../services/request.service';

//Mocks
import { RequestMockService } from './../../../mocks/services/request.mock';

describe('UserFavoriteApiService', () => {
  let service: UserFavoriteApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        { provide: RequestService, useValue: new RequestMockService() },
      ]
    });
    service = TestBed.inject(UserFavoriteApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it("should call getUserFavorite", () => {
    const spy = jest.spyOn(service.request, 'get')

    service.getUserFavorite();

    expect(spy).toHaveBeenCalledWith('/user-favorites/get?offset=0&limit=30');
  });

  it("should call addUserFavorite", () => {
    const spy = jest.spyOn(service.request, 'post')

    service.addUserFavorite('test');

    expect(spy).toHaveBeenCalledWith('/user-favorites/add', { data: { word: 'test' } });
  });

  it("should call deleteUserFavorite", () => {
    const spy = jest.spyOn(service.request, 'delete')

    service.deleteUserFavorite('test');

    expect(spy).toHaveBeenCalledWith('/user-favorites/remove/test');
  });
});
