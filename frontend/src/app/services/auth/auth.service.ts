import { ShowAlerts } from './../../utils/showAlerts';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { IAuthData } from 'src/app/models/auth-data.model';
import { HttpClient } from '@angular/common/http';
import { Subject, Subscription } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  API_URL = environment.API_URL;
  private token!: string | null;
  private tokenTimer: any;
  private authStatusListener = new Subject<boolean>();

  constructor(
    private http: HttpClient,
    private router: Router,
    private alerts: ShowAlerts
  ) {}

  getAuthStatusListener() {
    return this.authStatusListener.asObservable();
  }

  loginUser(username: string, password: string) {
    const authData: IAuthData = { username: username, password: password };
    this.http
      .post<{ token: string; expiresIn: number }>(
        `${this.API_URL}/employees/login`,
        authData
      )
      .subscribe({
        next: (response) => {
          if (response) {
            const token = response.token;
            this.token = token;
            if (token) {
              const expiresInDuration = response.expiresIn;
              this.setAuthTimer(expiresInDuration);
              setTimeout(() => {
                this.logout();
              }, expiresInDuration * 1000);
              localStorage.setItem('token', token);
              this.authStatusListener.next(true);
              const now = new Date();
              const expirationDate = new Date(
                now.getTime() + expiresInDuration * 1000
              );
              this.saveAuthData(token, expirationDate);
              this.router.navigate(['/dashboard']);
            }
          }
        },
        error: () => {
          this.alerts.showAlert('#fail-login');
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
    this.token = null;
    localStorage.clear();
    this.router.navigate(['/login']);
    this.clearAuthData();
    clearTimeout(this.tokenTimer);
  }

  private saveAuthData(token: string, expirationDate: Date) {
    localStorage.setItem('token', token);
    localStorage.setItem('expiration', expirationDate.toISOString());
  }

  private clearAuthData() {
    localStorage.removeItem('token');
    localStorage.removeItem('expiration');
  }

  autoAuthUser() {
    const authInformation = this.getAuthData();
    if (!authInformation) {
      return;
    }
    const now = new Date();
    const expiresInDuration =
      authInformation.expirationDate.getTime() - now.getTime();

    if (expiresInDuration > 0) {
      this.token = authInformation.token;
      this.setAuthTimer(expiresInDuration / 1000);
      this.authStatusListener.next(true);
    }
  }

  private getAuthData() {
    const token = localStorage.getItem('token');
    const expirationDate = localStorage.getItem('expiration');
    if (!token || !expirationDate) {
      return;
    }
    return {
      token: token,
      expirationDate: new Date(expirationDate),
    };
  }

  private setAuthTimer(duration: number) {
    this.tokenTimer = setTimeout(() => {
      this.logout();
    }, duration * 1000);
  }
}
