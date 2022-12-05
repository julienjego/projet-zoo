import { ShowAlerts } from './../../utils/showAlerts';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Species } from 'src/app/models/species.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class SpeciesService {
  API_URL = environment.API_URL;

  constructor(private http: HttpClient, private alerts: ShowAlerts) {}

  public getSpecies(): Observable<Species[]> {
    return this.http.get<Species[]>(`${this.API_URL}/species/`);
  }

  public getASpecies(id: number): Observable<Species> {
    return this.http.get<Species>(`${this.API_URL}/species/${id}`);
  }

  public feedAnimals(id: number) {
    return this.http
      .post(`${this.API_URL}/species/feed/${id}`, null)
      .subscribe({
        next: (response) => {
          this.alerts.showAlert('#success-feed');
          return response;
        },
        error: () => {
          this.alerts.showAlert('#fail-alert');
        },
      });
  }

  public stimulateAnimals(id: number) {
    return this.http
      .post(`${this.API_URL}/species/stimulate/${id}`, null)
      .subscribe({
        next: (response) => {
          this.alerts.showAlert('#success-stimulate');
          return response;
        },
        error: () => {
          this.alerts.showAlert('#fail-alert');
        },
      });
  }
}
