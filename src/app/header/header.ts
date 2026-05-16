import { Component } from '@angular/core';
import { Router, RouterModule } from "@angular/router";

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './header.html',
  styleUrl: './header.scss',
})
export class Header {

  isOpen = false;

  constructor(private router: Router) {}

  closeMenu() {
    this.isOpen = false;
  }


  get isLoggedIn(): boolean {
    return !!localStorage.getItem('token');
  }

  logout(): void {
    localStorage.removeItem('token');
    this.closeMenu();
    this.router.navigate(['/home']);
  }
}