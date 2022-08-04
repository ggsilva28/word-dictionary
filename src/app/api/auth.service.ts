import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

//Services
import { RequestService } from '../services/request.service';
import { LocalStorageService } from '../services/local-storage.service';

export interface IUser {
  id?: number;
  name: string;
  email: string;
  password: string;
  createdAt?: Date;
  updatedAt?: Date;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private request: RequestService,
    private localStorage: LocalStorageService,
    private router: Router,
  ) { }

  messages(key: string) {
    const messagesList: any = {
      'user.not_found': 'Usuário não encontrado',
      'user.invalid_password': 'Senha inválida',
      'user.created': 'Usuário criado com sucesso',
      'user.not_created': 'Não foi possível criar o usuário',
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
    this.localStorage.set('user', user);
    this.localStorage.set('token', token);

    return true;
  }

  isLogged() {
    return this.localStorage.get('token') !== null;
  }

  logout() {
    this.localStorage.remove('user');
    this.localStorage.remove('token');

    return true;
  }

  getUser(): IUser {
    return this.localStorage.get('user');
  }
}
