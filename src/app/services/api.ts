// import { HttpClient } from '@angular/common/http';
// import { UrlCodec } from '@angular/common/upgrade';
// import { Injectable } from '@angular/core';

// @Injectable({
//   providedIn: 'root',
// })
// export class Api {
//   constructor(private http: HttpClient){
//   }

//   baseUrl=`https://restaurantapi.stepacademy.ge/api/`
//   apiKey=`460c5b68-9f8c-44ff-a6b6-5692d9d0ad6e`


//   getAll(url:string){
//     return this.http.get(this.baseUrl + url,{
//       headers : {
//         "X-API-KEY":this.apiKey
//       }
//     })
//   }


//     login(obj : any){
//      return this.http.post("https://restaurantapi.stepacademy.ge/api/auth/login", obj, {
//        headers : {
//           "X-API-KEY" : "14c34c99-91b6-41a8-ad96-f4d3dc43e35b"
//        }
//      })
//  }

//  register(obj : any){
//    return this.http.post("https://restaurantapi.stepacademy.ge/api/auth/register", obj,{
//        headers : {
//           "X-API-KEY" : "14c34c99-91b6-41a8-ad96-f4d3dc43e35b"
//        }
     
//    })
//  }


//   verify(obj : any){
//     return this.http.put("https://restaurantapi.stepacademy.ge/api/auth/verify-email", obj, {
//        headers : {
//           "X-API-KEY" : "14c34c99-91b6-41a8-ad96-f4d3dc43e35b"
//        }
     
//    })
//    }




// getDatafromApi(url: string) {
//   return this.http.get(this.baseUrl + url, {
//     headers: {
//       "X-API-KEY": this.apiKey
//     }
//   });
// }

// post(url: string, body: any) {

//   const token = localStorage.getItem('token');

//   return this.http.post(
//     this.baseUrl + url,
//     body,
//     {
//       headers: {
//         "X-API-KEY": this.apiKey,
//         "Authorization": `Bearer ${token}`
//       }
//     }
//   );
// }


// delete(url: string) {

//   const token = localStorage.getItem('token');

//   return this.http.delete(
//     this.baseUrl + url,
//     {
//       headers: {
//         "X-API-KEY": this.apiKey,
//         "Authorization": `Bearer ${token}`
//       }
//     }
//   );
// }


// put(url: string, body: any) {

//   const token = localStorage.getItem('token');

//   return this.http.put(
//     this.baseUrl + url,
//     body,
//     {
//       headers: {
//         "X-API-KEY": this.apiKey,
//         "Authorization": `Bearer ${token}`
//       }
//     }
//   );
// }


// }

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