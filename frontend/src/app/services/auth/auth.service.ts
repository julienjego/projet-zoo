import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { AuthData } from 'src/app/models/auth-data.model';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  API_URL = environment.API_URL;
  private token!: string | null;
  public authFailed: boolean = false;
  private tokenTimer: any;

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
            const expiresInDuration = response.expiresIn;
            localStorage.setItem('token', token);
            this.token = token;
            this.router.navigate(['/dashboard']);
            if (token) {
              setTimeout(() => {
                alert(
                  'SESSION EXPIREE\nVotre session a expiré, vous allez être déconnecté.'
                );
                this.logout();
              }, expiresInDuration * 1000);
            }
          }
        },
        error: (error) => {
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
    clearTimeout(this.tokenTimer);
    this.router.navigate(['/login']);
  }
}
