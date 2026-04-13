import { Component } from '@angular/core';
import { Router, RouterLink, RouterModule } from "@angular/router";

@Component({
  selector: 'app-error',
  imports: [RouterModule],
  templateUrl: './error.html',
  styleUrl: './error.scss',
})
export class Error {
  constructor(private router : Router) {}









  gotohome(){
    this.router.navigate([`/home`])
  }









}
