import { Injectable } from '@angular/core';

//Services
import { RequestService } from '../services/request.service';
import { LocalStorageService } from '../services/local-storage.service';

//Utils
import { keys } from '../utils/keys.enum';

@Injectable({
  providedIn: 'root'
})
export class WordsApiService {

  constructor(
    private request: RequestService,
    private localStorage: LocalStorageService
  ) { }

  get(limit: number, offset: number) {
    return this.request.get(`/words/list?offset=${offset}&limit=${limit}`);
  }

  async getWord(word: string): Promise<any> {
    this.saveToHistory(word);
    const wordAPI = await this.localStorage.get(keys.WORD_API) || {};

    if (wordAPI && wordAPI[word]) {
      return wordAPI[word];
    } else {
      const response = await this.request.get(`/words/detail/${word}`);
      wordAPI[word] = response;
      await this.localStorage.set(keys.WORD_API, wordAPI);
      return response;
    }
  }

  async saveToHistory(word: string) {
    const history = await this.localStorage.get(keys.HISTORY) || [];
    if (history.indexOf(word) === -1) {
      history.push(word);
      await this.localStorage.set(keys.HISTORY, history);
    }
  }

  async updateOnWordAPIHistory(word: string, newData: any) {
    const wordAPIHistory = await this.localStorage.get(keys.WORD_API) || [];
    const current = wordAPIHistory[word];
    if (current) {
      wordAPIHistory[word] = { ...current, data: { ...current.data, ...newData } }
      await this.localStorage.set(keys.WORD_API, wordAPIHistory);
    }
  }

  async getHistory(): Promise<any> {
    const history = this.localStorage.get(keys.HISTORY);

    return {
      isOk: true,
      data: {
        results: history
      }
    }
  }

}
