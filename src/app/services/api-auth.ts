import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ApiAuth {
  baseUrl = `https://restaurantapi.stepacademy.ge/api/`;
  apiKey = `460c5b68-9f8c-44ff-a6b6-5692d9d0ad6e`;

  constructor(private http: HttpClient) {}

  login(userLogin: { email: string, password: string }) {

    return this.http.post(
      this.baseUrl + `auth/login`,
      userLogin,
      {
        headers: {
          "X-API-KEY": this.apiKey
        }
      }
    );

  }


  register(userRegister: {
    firstName: string,
    lastName: string,
    email: string,
    password: string
  }) {

    return this.http.post(
      this.baseUrl + `auth/register`,
      userRegister,
      {
        headers: {
          "X-API-KEY": this.apiKey
        }
      }
    );

  }


  resendEmailVerification(email: string) {
  return this.http.post(
    this.baseUrl + `auth/resend-email-verification/${email}`,
    {},
    {
      headers: {
        "X-API-KEY": this.apiKey
      }
    }
  );
}



  emailVerification(data: { email: string, code: string }) {
  return this.http.put(
    this.baseUrl + `auth/verify-email`,
    data,
    {
      headers: { "X-API-KEY": this.apiKey }
    }
  );
}



  refreshAccesToken(refreshToken: string) {

    return this.http.post(
      this.baseUrl + `auth/refresh-access-token/${refreshToken}`,
      { refreshToken },
      {
        headers: {
          "X-API-KEY": this.apiKey
        }
      }
    );

  }



  forgotpassword(email: string) {
  return this.http.post(
    this.baseUrl + `auth/forgot-password`,
    { email },
    {
      headers: { "X-API-KEY": this.apiKey }
    }
  );
}



  resetPassword(data: {
    email: string,
    password: string,
    token: string
  }) {

    return this.http.post(
      this.baseUrl + `auth/reset-password`,
      data,
      {
        headers: {
          "X-API-KEY": this.apiKey
        }
      }
    );

  }

}
