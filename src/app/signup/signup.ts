import { ChangeDetectorRef, Component } from '@angular/core';
import { Api } from '../services/api';
import { Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-signup',
  imports: [FormsModule, RouterLink],
  templateUrl: './signup.html',
  styleUrl: './signup.scss',
})
export class Signup {
    constructor(private api : Api, private router : Router, private cdr : ChangeDetectorRef){
    
  }

  showVerifyInput : boolean = false;
  code  =  ""
  email = ""


  verify(){
    this.api.verify({email : this.email, code : this.code}).subscribe({
       next : (resp : any) =>{
          this.router.navigate(["/login"])
       },
       error :  er => alert(er.message)
    })

  }

  register(form : any){

    this.api.register(form).subscribe({
      next : (resp : any) =>{
        
         console.log(resp);
         this.showVerifyInput = true;
         this.cdr.detectChanges();
      },
      error :  er => alert(er.message)
    })

  }
}
