import { AuthService } from './../services/auth/auth.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  constructor(private router: Router, private authService: AuthService) {}

  ngOnInit(): void {}

  goToEnclosures(): void {
    this.router.navigate(['/enclosures']);
  }

  goToAnimals(): void {
    this.router.navigate(['/animals']);
  }

  logout(): void {
    this.authService.logout();
  }
}
