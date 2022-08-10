import { Injectable } from '@angular/core';

//Services
import { RequestService } from '../services/request.service';
import { LocalStorageService } from '../services/local-storage.service';

//Interfaces
import { IUser } from '../interfaces/user';

//Utils
import { keys } from '../utils/keys.enum';


@Injectable({
  providedIn: 'root'
})
export class AuthApiService {

  constructor(
    public request: RequestService,
    public localStorage: LocalStorageService,
  ) { }

  messages(key: string) {
    const messagesList: any = {
      'user.not_found': 'User not found!',
      'user.invalid_password': 'Invalid password!',
      'user.created': 'User created!',
      'user.not_created': 'User not created!',
    }

    return messagesList[key];
  }

  login(email: string, password: string) {
    return this.request.post('/auth/login', { email, password });
  }

  createAccount(data: IUser) {
    return this.request.post('/user/create', data);
  }

  save(user: IUser, token: string) {
    this.localStorage.set(keys.USER, user);
    this.localStorage.set(keys.TOKEN, token);

    return true;
  }

  isLogged() {
    return this.localStorage.get(keys.TOKEN) !== null;
  }

  logout() {
    this.localStorage.remove(keys.USER);
    this.localStorage.remove(keys.TOKEN);

    return true;
  }

  getUser(): IUser {
    return this.localStorage.get(keys.USER);
  }
}
