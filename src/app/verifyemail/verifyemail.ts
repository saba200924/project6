import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ApiAuth } from '../services/api-auth';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-verifyemail',
  imports: [FormsModule, CommonModule],
  templateUrl: './verifyemail.html',
  styleUrl: './verifyemail.scss',
})
export class Verifyemail {
  email: string = localStorage.getItem('email') || '';
  verificationCode: string = '';


    constructor(
    private apiAuth: ApiAuth,
    private route: ActivatedRoute,
    private router: Router
  ) {}


   verifyByCode() {
  const payload = { 
    email: this.email.trim(), 
    code: this.verificationCode.trim()
  };
  console.log('Data sent:', payload);

 
    this.apiAuth.emailVerification(payload).subscribe({
      next: () => {
        alert('Your email has been verified! You can now log in.');
        this.router.navigate(['/login']);
      },
      error: (err) => {
        console.log('Error details:', err.error);
        alert(err.error?.detail ||'Invalid code or expired');
      }
    });
  }



  //   resend() {
  //   if (!this.email) {
  //     alert('Email not found');
  //     return;
  //   }
  //   this.apiAuth.resendEmailVerification(this.email).subscribe({
  //     next: () => alert('A new code has been sent to your email.'),
  //     error: (err) => alert('Error sending')
  //   });
  // }

  resend() {
  if (!this.email) {
    alert('Email not found');
    return;
  }

  this.apiAuth.resendEmailVerification(this.email).subscribe({
    next: () => {
      alert('A new code has been sent to your email.');
    },
    error: (err) => {
      console.log('Resend error:', err);

      // show real backend message if exists
      alert(err.error?.detail || err.error?.title || 'Failed to send verification email');
    }
  });
}

}
