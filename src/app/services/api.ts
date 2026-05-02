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


    login(obj : any){
     return this.http.post("https://restaurantapi.stepacademy.ge/api/auth/login", obj, {
       headers : {
          "X-API-KEY" : "14c34c99-91b6-41a8-ad96-f4d3dc43e35b"
       }
     })
 }

 register(obj : any){
   return this.http.post("https://restaurantapi.stepacademy.ge/api/auth/register", obj,{
       headers : {
          "X-API-KEY" : "14c34c99-91b6-41a8-ad96-f4d3dc43e35b"
       }
     
   })
 }


  verify(obj : any){
    return this.http.put("https://restaurantapi.stepacademy.ge/api/auth/verify-email", obj, {
       headers : {
          "X-API-KEY" : "14c34c99-91b6-41a8-ad96-f4d3dc43e35b"
       }
     
   })
   }




}