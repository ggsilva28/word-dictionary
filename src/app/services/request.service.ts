import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';

import { LocalStorageService } from './local-storage.service';

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
    private http: HttpClient,
    private localStorage: LocalStorageService
  ) { }

  get(url: string, params?: any, headers?: any) {
    return this.request('get', url, params, headers);
  }

  post(url: string, params?: any, headers?: any) {
    return this.request('post', url, params, headers);
  }

  put(url: string, params?: any, headers?: any) {
    return this.request('put', url, params, headers);
  }

  delete(url: string, params?: any, headers?: any) {
    return this.request('delete', url, params, headers);
  }

  private async request(method: string, url: string, params?: any, headers?: any): Promise<requestResponse> {
    const token = this.localStorage.get('token');

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
          response = await this.http.get<requestResponse>(environment.apiUrl + url, httpOptions).toPromise();
          break;
        case 'post':
          response = await this.http.post<requestResponse>(environment.apiUrl + url, params, httpOptions).toPromise();
          break;
        case 'put':
          response = await this.http.put<requestResponse>(environment.apiUrl + url, params, httpOptions).toPromise();
          break;
        case 'delete':
          response = await this.http.delete<requestResponse>(environment.apiUrl + url, httpOptions).toPromise();
          break;
      }

      if (!response) {
        throw {
          code: 0,
          message: 'Não foi possível conectar ao servidor'
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
        message: e.error || e.message || 'Ocorreu um erro inesperado',
      }
    }

  }
}
