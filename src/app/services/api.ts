import { HttpClient } from '@angular/common/http';
import { UrlCodec } from '@angular/common/upgrade';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class Api {
  constructor(private http: HttpClient){
  }

  baseUrl=`https://restaurantapi.stepacademy.ge/api/`
  apiKey=`460c5b68-9f8c-44ff-a6b6-5692d9d0ad6e`


  getAll(url:string){
    return this.http.get(this.baseUrl + url,{
      headers : {
        "X-API-KEY":this.apiKey
      }
    })
  }

  // https://restaurantapi.stepacademy.ge/api/products?Take=100&Page=1




}