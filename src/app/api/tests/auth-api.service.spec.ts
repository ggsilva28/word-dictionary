import { TestBed } from '@angular/core/testing';

import { AuthApiService } from '../auth-api.service';

//Services
import { RequestService } from '../../services/request.service';
import { LocalStorageService } from '../../services/local-storage.service';

//Utils
import { keys } from '../../utils/keys.enum';

//Mocks
import { RequestMockService } from './../../../mocks/services/request.mock';
import { LocalStorageMockService } from './../../../mocks/services/local-storage.mock';

describe('AuthService', () => {
  let service: AuthApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        { provide: RequestService, useValue: new RequestMockService() },
        { provide: LocalStorageService, useValue: new LocalStorageMockService() },
      ]
    });
    service = TestBed.inject(AuthApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it("should return a message", () => {
    expect(service.messages('user.not_found')).toBe('User not found!');
  });

  it("should call login", () => {
    const spy = jest.spyOn(service.request, 'post')

    service.login('test@email.com', '123456');

    expect(spy).toHaveBeenCalledWith('/auth/login', { email: 'test@email.com', password: '123456' });
  });

  it("should call create account", () => {
    const spy = jest.spyOn(service.request, 'post')
    const user = { name: 'Test', email: 'test@email.com', password: '123456' };

    service.createAccount(user);

    expect(spy).toHaveBeenCalledWith('/user/create', user);
  });

  it("should save user and token on local storage", () => {
    const spy = jest.spyOn(service.localStorage, 'set')
    const user = { name: 'Test', email: '', password: '' };
    const token = '123456';

    service.save(user, token);

    expect(spy.mock.calls).toEqual([
      [keys.USER, user],
      [keys.TOKEN, token]
    ]);
  });

  it("should return true if user is logged", () => {
    const spy = jest.spyOn(service.localStorage, 'get')

    service.isLogged();

    expect(spy).toHaveBeenCalledWith(keys.TOKEN);
  });

  it("should remove user and token from local storage", () => {
    const spy = jest.spyOn(service.localStorage, 'remove')

    service.logout();

    expect(spy.mock.calls).toEqual([
      [keys.USER],
      [keys.TOKEN]
    ]);
  });

  it("should return user from local storage", () => {
    const spy = jest.spyOn(service.localStorage, 'get')

    service.getUser();

    expect(spy).toHaveBeenCalledWith(keys.USER);
  });
});
