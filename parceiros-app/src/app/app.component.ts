import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'external-campanies',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  username: string = '';
  password: string = '';
  stayConnected: boolean = false;

  constructor(private router: Router) {}

  login() {
    if (this.username && this.password) {
      if (this.stayConnected) {
        document.cookie = `user=${this.username}; path=/; max-age=604800`;
      } else {
        localStorage.setItem('user', this.username);
      }
      this.router.navigate(['/dashboard']);
    }
  }
}
