import { ShowAlerts } from './../../utils/showAlerts';
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

  constructor(private http: HttpClient, private alerts: ShowAlerts) {}

  public getActions(
    id: string | number,
    endpoint: string
  ): Observable<Action[]> {
    return this.http.get<Action[]>(`${this.API_URL}/${endpoint}/${id}`).pipe(
      tap((results) => {
        results.sort(
          (a: Action, b: Action) =>
            new Date(b.date).getTime() - new Date(a.date).getTime()
        );
      })
    );
  }

  public createAction(
    enclos: string,
    espece: string,
    animal: string,
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
        this.alerts.showAlert('#success-action');
        return response;
      },
      error: () => {
        this.alerts.showAlert('#fail-action');
      },
    });
  }
}
