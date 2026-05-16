// import { Component, OnInit } from '@angular/core';
// import { FormsModule } from '@angular/forms';
// import { ApiAuth } from '../services/api-auth';
// import { CommonModule } from '@angular/common';
// import { Router, RouterLinkWithHref, RouterModule, ActivatedRoute } from '@angular/router';
// import { Auth } from '../services/auth';

// @Component({
//   selector: 'app-login',
//   standalone: true,
//   imports: [FormsModule, CommonModule, RouterLinkWithHref, RouterModule],
//   templateUrl: './login.html',
//   styleUrl: './login.scss',
//   providers:[Auth]
// })
// export class Login implements OnInit{
//   userId!: number;
//   email: string = '';
//   password: string = '';
//   ProfileData: any;
 
  
//   constructor(
//     private apiAuth: ApiAuth,
//     private router: Router,
//     private route: ActivatedRoute,
//     // private auth: Auth
//   ) {}
  
// ngOnInit() {
//   this.route.queryParamMap.subscribe(params => {
//     const token = params.get('token');
    
//   });
// }



// login() {
//   if (!this.email || !this.password) {
//     alert('Please fill in all fields');
//     return;
//   }

//   this.apiAuth.login({
//     email: this.email.trim(),
//     password: this.password.trim()
//   }).subscribe({
//     next: (response: any) => {
//       console.log('Login successful:', response);

//       localStorage.setItem('token', response.data.accessToken);

//       this.router.navigate(['/menu']);
//     },
//     error: (err) => {
//       console.log(err);
//       alert(err.error?.detail || 'Login failed');
//     }
//   });
// }



// }

import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router, RouterModule, ActivatedRoute } from '@angular/router';
import { Api } from '../services/api';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, CommonModule, RouterModule],
  templateUrl: './login.html',
  styleUrl: './login.scss'
})
export class Login implements OnInit {

  email = '';
  password = '';

  constructor(
    private api: Api,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.route.queryParamMap.subscribe(params => {
      const token = params.get('token');
    });
  }

  login() {
    if (!this.email || !this.password) {
      alert('Please fill in all fields');
      return;
    }

    this.api.login({
      email: this.email.trim(),
      password: this.password.trim()
    }).subscribe({
      next: (res: any) => {

        localStorage.setItem('token', res.data.accessToken);

        this.router.navigate(['/menu']);
      },
      error: (err) => {
        console.log(err);
        alert(err.error?.detail || 'Login failed');
      }
    });
  }
}