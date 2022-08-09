import { Injectable } from '@angular/core';

//Services
import { RequestService } from '../services/request.service';

export interface IUserFavorite {
  word: string;
  isFavorite?: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class UserFavoriteApiService {

  constructor(
    private request: RequestService
  ) { }

  public getUserFavorite(offset: number = 0, limit: number = 30) {
    return this.request.get(`/user-favorites/get?offset=${offset}&limit=${limit}`);
  }

  public addUserFavorite(word: string) {
    return this.request.post(`/user-favorites/add`, { data: { word } });
  }

  public deleteUserFavorite(word: string) {
    return this.request.delete(`/user-favorites/remove/${word}`);
  }
}
