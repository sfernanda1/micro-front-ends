import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  username: string = '';
  password: string = '';
  stayConnected: boolean = false;
  returnUrl: string = '/dashboard';

  constructor(private router: Router, private route: ActivatedRoute) {}

  ngOnInit() {
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || this.returnUrl;
  }

  login() {
    if (this.username && this.password) {
      if (this.stayConnected) {
        document.cookie = `user=${this.username}; path=/; max-age=604800`;
      } else {
        localStorage.setItem('user', this.username);
      }
      this.router.navigateByUrl(this.returnUrl);
    }
  }
}
