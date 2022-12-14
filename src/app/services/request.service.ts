import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { environment } from '../../environments/environment';

//Services
import { LocalStorageService } from './local-storage.service';

//Utils
import { keys } from './../utils/keys.enum';

interface requestResponse {
  isOk: boolean;
  code: number;
  message: string;
  error?: string;
  data?: any;
}

@Injectable({
  providedIn: 'root'
})
export class RequestService {

  constructor(
    public http: HttpClient,
    public localStorage: LocalStorageService
  ) { }

  get(url: string, params?: any, headers?: any, baseUrl?: string) {
    return this.request('get', url, params, headers, baseUrl);
  }

  post(url: string, params?: any, headers?: any, baseUrl?: string) {
    return this.request('post', url, params, headers, baseUrl);
  }

  put(url: string, params?: any, headers?: any, baseUrl?: string) {
    return this.request('put', url, params, headers, baseUrl);
  }

  delete(url: string, params?: any, headers?: any, baseUrl?: string) {
    return this.request('delete', url, params, headers, baseUrl);
  }

  private async request(method: string, url: string, params?: any, headers?: any, baseUrl: string = environment.apiUrl): Promise<requestResponse> {
    const token = this.localStorage.get(keys.TOKEN);

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With',
        'Authorization': `Bearer ${token}`
      }),
      params: new HttpParams()
    };

    if (params) {
      Object.keys(params).forEach(key => {
        httpOptions.params = httpOptions.params.set(key, params[key]);
      });
    }

    if (headers) {
      Object.keys(headers).forEach(key => {
        httpOptions.headers = httpOptions.headers.set(key, headers[key]);
      });
    }

    try {

      let response = null;

      switch (method) {
        case 'get':
          response = await this.http.get<requestResponse>(baseUrl + url, httpOptions).toPromise();
          break;
        case 'post':
          response = await this.http.post<requestResponse>(baseUrl + url, params, httpOptions).toPromise();
          break;
        case 'put':
          response = await this.http.put<requestResponse>(baseUrl + url, params, httpOptions).toPromise();
          break;
        case 'delete':
          response = await this.http.delete<requestResponse>(baseUrl + url, httpOptions).toPromise();
          break;
      }

      if (!response) {
        throw {
          code: 0,
          message: 'N??o foi poss??vel conectar ao servidor'
        }
      }

      if (response.error) {
        throw response
      }

      return { ...response, isOk: true };

    } catch (e: any) {

      return {
        isOk: false,
        code: e.code || 500,
        message: e.error.error || e.message || 'Ocorreu um erro inesperado',
        data: e.error.data || null
      }
    }
  }
}
