import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { AuthData } from '../models/auth-data.model';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  API_URL = 'http://localhost:8888/api';
  private token!: string;
  public authSuccess: boolean | null = null;

  constructor(private http: HttpClient, private router: Router) {}

  getToken(): string {
    return this.token;
  }

  loginUser(username: string, password: string): boolean | null {
    const authData: AuthData = { username: username, password: password };
    this.http
      .post<{ token: string; expiresIn: number }>(
        `${this.API_URL}/employees/login`,
        authData
      )
      .subscribe((response) => {
        if (response) {
          const token = response.token;
          localStorage.setItem('token', token);
          this.token = token;
          this.router.navigate(['/dashboard']);
          return (this.authSuccess = true);
        } else {
          return (this.authSuccess = false);
        }
      });
    return null;
  }
}
