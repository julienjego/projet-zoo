import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { AuthData } from '../models/auth-data.model';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  API_URL = 'http://localhost:8888/api';
  private token!: string | null;
  public authFailed: boolean = false;

  constructor(private http: HttpClient, private router: Router) {}

  loginUser(username: string, password: string) {
    const authData: AuthData = { username: username, password: password };
    this.http
      .post<{ token: string; expiresIn: number }>(
        `${this.API_URL}/employees/login`,
        authData
      )
      .subscribe({
        next: (response) => {
          if (response) {
            const token = response.token;
            localStorage.setItem('token', token);
            this.token = token;
            this.router.navigate(['/dashboard']);
            this.authFailed = false;
          }
        },
        error: (error) => {
          this.authFailed = true;
          console.log(this.authFailed);
        },
      });
  }

  getAuthStatus(): boolean {
    return (
      localStorage.getItem('token') != undefined &&
      localStorage.getItem('token')!.length > 0
    );
  }

  logout() {
    localStorage.setItem('token', '');
    this.router.navigate(['/login']);
  }
}
