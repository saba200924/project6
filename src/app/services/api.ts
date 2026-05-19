import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class Api {

  private baseUrl = 'https://restaurantapi.stepacademy.ge/api/';
  private apiKey = '14c34c99-91b6-41a8-ad96-f4d3dc43e35b';

  constructor(private http: HttpClient) {}

  private getHeaders() {
    const token = localStorage.getItem('token');

    return {
      headers: new HttpHeaders({
        'X-API-KEY': this.apiKey,
        Authorization: token ? `Bearer ${token}` : ''
      })
    };
  }

  // GET
  getAll(url: string) {
    return this.http.get(this.baseUrl + url, this.getHeaders());
  }

  // POST
  post(url: string, body: any) {
    return this.http.post(this.baseUrl + url, body, this.getHeaders());
  }

  // PUT
  put(url: string, body: any) {
    return this.http.put(this.baseUrl + url, body, this.getHeaders());
  }

  // DELETE
  delete(url: string) {
    return this.http.delete(this.baseUrl + url, this.getHeaders());
  }

  // AUTH LOGIN
  login(obj: any) {
    return this.http.post(
      this.baseUrl + 'auth/login',
      obj,
      {
        headers: new HttpHeaders({
          'X-API-KEY': this.apiKey
        })
      }
    );
  }

  register(obj: any) {
    return this.http.post(
      this.baseUrl + 'auth/register',
      obj,
      {
        headers: new HttpHeaders({
          'X-API-KEY': this.apiKey
        })
      }
    );
  }

  verify(obj: any) {
    return this.http.put(
      this.baseUrl + 'auth/verify-email',
      obj,
      {
        headers: new HttpHeaders({
          'X-API-KEY': this.apiKey
        })
      }
    );
  }
}