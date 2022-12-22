import { AuthService } from './../auth/auth.service';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Event } from 'src/app/models/event.model';

@Injectable({
  providedIn: 'root',
})
export class EventService {
  API_URL = environment.API_URL;
  constructor(private http: HttpClient, private auth: AuthService) {}

  public getEvents(id: string | number, endpoint: string): Observable<Event[]> {
    return this.http.get<Event[]>(`${this.API_URL}/${endpoint}/${id}`).pipe(
      tap({
        next: (results) => {
          results.sort(
            (a: Event, b: Event) =>
              new Date(b.date).getTime() - new Date(a.date).getTime()
          );
        },
        error: (error) => {
          if (error.status === 401) {
            this.auth.logout();
          }
        },
      })
    );
  }
}
