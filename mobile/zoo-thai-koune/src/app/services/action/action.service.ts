import { Enclosure } from 'src/app/models/enclosure.model';
import { Species } from 'src/app/models/species.model';
import { Animal } from 'src/app/models/animal.model';
import { IActionData } from './../../models/action-data.model';
import { HttpClient } from '@angular/common/http';
import { Action } from './../../models/action.model';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ActionService {
  API_URL = environment.API_URL;

  constructor(private http: HttpClient) {}

  public getActions(
    id: string | number | null,
    endpoint: string
  ): Observable<Action[]> {
    return this.http.get<Action[]>(`${this.API_URL}/${endpoint}/${id}`).pipe(
      tap({
        next: (results) => {
          results.sort(
            (a: Action, b: Action) =>
              new Date(a.date).getTime() - new Date(b.date).getTime()
          );
        },
        error: (error) => {
          if (error.status === 401) {
            console.log('401');
          }
        },
      })
    );
  }

  public createAction(
    enclos: Enclosure,
    espece: Species,
    animal: Animal,
    obs: string,
    date: string
  ) {
    const actionData: IActionData = {
      enclos: enclos,
      espece: espece,
      animal: animal,
      observations: obs,
      date: date,
    };
    this.http.put(`${this.API_URL}/actions/create`, actionData).subscribe({
      next: (response) => {
        return response;
      },
      error: () => {},
    });
  }

  public deleteAction(id: string) {
    return this.http.delete(`${this.API_URL}/actions/delete/${id}`).subscribe({
      next: (response) => {
        return response;
      },
      error: () => {},
    });
  }
}
