import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ApiAuth } from '../services/api-auth';
import { Router } from '@angular/router';;

@Component({
  selector: 'app-signup',
  imports: [ReactiveFormsModule],
  templateUrl: './signup.html',
  styleUrl: './signup.scss',
})
export class Signup {
 signInForm: FormGroup;
   constructor (
   private apiAuth : ApiAuth,
   private router : Router,
   private FB: FormBuilder
  ) {

// this.signInForm = this.FB.group ({
//   firstName: ["", [Validators.required, Validators.pattern(/^[A-Za-z]+$/)]],
//   lastName: ["",[Validators.required, Validators.pattern(/^[A-Za-z]+$/)]],
//   email: ["", [Validators.required, Validators.email]],
//   password: ["", [Validators.required,Validators.minLength(6), Validators.pattern(/^(?=.*[A-Z])(?=.*[^A-Za-z0-9]).+$/)
//   ]]
// })
// }

this.signInForm = this.FB.group({
      firstName: ["", [Validators.required, Validators.pattern(/^[A-Za-z]+$/)]],
      lastName: ["", [Validators.required, Validators.pattern(/^[A-Za-z]+$/)]],
      email: ["", [Validators.required, Validators.email]],
      password: ["", [
        Validators.required, 
        Validators.minLength(6), 
        Validators.pattern(/^(?=.*[A-Z])(?=.*[^A-Za-z0-9]).+$/)
      ]]
    });
  }

  // --- Real-time Clue Logic ---
  get hasCapitalLetter() {
    return /[A-Z]/.test(this.signInForm.get('password')?.value || '');
  }

  get hasSpecialChar() {
    return /[^A-Za-z0-9]/.test(this.signInForm.get('password')?.value || '');
  }



showResendButton = false
//   register(){
// console.log(this.signInForm.value);
// console.log(this.signInForm.invalid);


//     if (this.signInForm.valid) {
//     this.apiAuth.register(this.signInForm.value).subscribe({
//       next: (resp: any) => {
//         console.log(resp);
//         this.router.navigateByUrl('/verifyemail')
//         localStorage.setItem('email', this.signInForm.value.email)
//       },
//       error: (er) => {
//         if (er.error.detail.includes('already exists')) {
//           this.showResendButton = true;
//         }
//         alert(er.error.detail);
//       }
//     });
//   }
// }




register(){

  console.log("FORM VALUE:", this.signInForm.value);

  if (this.signInForm.valid) {

    this.apiAuth.register(this.signInForm.value).subscribe({

      next: (resp: any) => {
        console.log("SUCCESS:", resp);

        this.router.navigateByUrl('/verifyemail');

        localStorage.setItem(
          'email',
          this.signInForm.value.email
        );
      },

      error: (er) => {

        console.log("FULL ERROR:", er);

        console.log("ERROR BODY:", er.error);

        alert(JSON.stringify(er.error));

        if (er.error.detail?.includes('already exists')) {
          this.showResendButton = true;
        }

      }

    });

  } else {

    console.log("FORM INVALID");

    console.log(this.signInForm);

  }

}
}
