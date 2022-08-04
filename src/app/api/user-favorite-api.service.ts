import { Injectable } from '@angular/core';

//Services
import { RequestService } from '../services/request.service';

export interface IUserFavorite {
  id: number;
  name: string;
  description: string;
  thumbnail: string;
  link: string;
  isFavorite?: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class UserFavoriteApiService {

  constructor(
    private request: RequestService
  ) { }

  public getUserFavorite(type: string, offset: number = 0, limit: number = 30) {
    return this.request.get(`/user-favorites/get?type=${type}&offset=${offset}&limit=${limit}`);
  }

  public addUserFavorite(type: string, data: IUserFavorite) {
    return this.request.post(`/user-favorites/add`, { type, data });
  }

  public deleteUserFavorite(id: number) {
    return this.request.delete(`/user-favorites/remove/${id}`);
  }
}
