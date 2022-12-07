import { ShowAlerts } from './../../utils/showAlerts';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { AuthData } from 'src/app/models/auth-data.model';
import { HttpClient } from '@angular/common/http';
import { delay, of, Subject, Subscription } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  API_URL = environment.API_URL;
  private token!: string | null;
  private tokenSubscription = new Subscription();
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
            this.authStatusListener.next(true);
            if (token) {
              this.tokenSubscription = of(null)
                .pipe(delay(expiresInDuration * 1000))
                .subscribe((expired) => {
                  localStorage.setItem('token', '');
                  console.log('t ' + expiresInDuration * 1000);
                  console.log('exp ' + expired);
                  alert('Votre session a expiré. Vous allez être déconnecté !');
                  this.logout();
                  console.log(
                    'EXPIRED!! at ' +
                      new Date().getHours() +
                      ':' +
                      new Date().getMinutes()
                  );
                  console.log('exp tok ' + this.token);
                });
            }
          }
        },
        error: (error) => {
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
    this.tokenSubscription.unsubscribe();
    this.token = null;
    localStorage.clear();
    this.router.navigate(['/login']);
  }
}
