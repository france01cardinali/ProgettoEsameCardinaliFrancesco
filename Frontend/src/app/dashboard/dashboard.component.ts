import { Component, OnInit } from '@angular/core';
import { AuthService } from '../login/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
  user: any;

  constructor(private authService: AuthService, private router: Router) {}

  

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
