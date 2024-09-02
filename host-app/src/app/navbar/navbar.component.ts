import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  showProfileMenu = false;

  constructor(private router: Router) {}

  toggleProfileMenu() {
    this.showProfileMenu = !this.showProfileMenu;
  }

  logout() {
    localStorage.removeItem('user');
    document.cookie = 'user=; Max-Age=-99999999;';
    this.router.navigate(['/login']);
  }
}
