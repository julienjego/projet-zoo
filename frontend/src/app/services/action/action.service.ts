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

  //TODO continuer création action
  public createAction(obs: string, date: Date) {
    const actionData: IActionData = { observations: obs, date: date };
    this.http.put(`${this.API_URL}/actions/create`, actionData);
  }
}
