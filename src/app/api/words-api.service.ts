import { Injectable } from '@angular/core';

//Services
import { RequestService } from '../services/request.service';

@Injectable({
  providedIn: 'root'
})
export class WordsApiService {

  constructor(
    private request: RequestService
  ) { }

  get(limit: number, offset: number) {
    return this.request.get(`/words/list?offset=${offset}&limit=${limit}`);
  }

}
