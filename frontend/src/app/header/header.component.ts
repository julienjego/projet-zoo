import { AuthService } from './../services/auth/auth.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit, OnDestroy {
  private authListenerSubs!: Subscription;
  public userIsAuthenticated = false;

  constructor(private router: Router, private authService: AuthService) {}

  ngOnInit(): void {
    this.authListenerSubs = this.authService
      .getAuthStatusListener()
      .subscribe((isAuthenticated) => {
        this.userIsAuthenticated = isAuthenticated;
        localStorage.setItem('autenticated', isAuthenticated.toString());
      });
    this.userIsAuthenticated = localStorage.getItem('autenticated') === 'true';
  }

  ngOnDestroy(): void {
    this.authListenerSubs.unsubscribe();
  }

  goToDashboard(): void {
    this.router.navigate(['/dashboard']);
  }

  goToEnclosures(): void {
    this.router.navigate(['/enclosures']);
  }

  goToAnimals(): void {
    this.router.navigate(['/animals']);
  }

  goToSpecies(): void {
    this.router.navigate(['/species']);
  }

  logout(): void {
    this.userIsAuthenticated = false;
    this.authService.logout();
  }
}
