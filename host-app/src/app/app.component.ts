import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  showNavbar = true;

  constructor(private router: Router) {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.showNavbar = !event.url.includes('login');
      }
    });
  }

  ngOnInit(): void {
    this.checkUserAuthentication();
  }

  private checkUserAuthentication(): void {
    const user = localStorage.getItem('user'); 
    if (!user) {
      this.router.navigate(['/login']);
    }
  }
}
