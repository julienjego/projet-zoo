import { ShowAlerts } from './../../utils/showAlerts';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Animal } from 'src/app/models/animal.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AnimalService {
  API_URL = environment.API_URL;

  constructor(private http: HttpClient, private alerts: ShowAlerts) {}

  public getAnimals(): Observable<Animal[]> {
    return this.http.get<Animal[]>(`${this.API_URL}/animals/`);
  }

  public getAnAnimal(id: string): Observable<Animal> {
    return this.http.get<Animal>(`${this.API_URL}/animals/${id}`);
  }

  public getAnimalsByEnclosure(id: number): Observable<Animal[]> {
    return this.http.get<Animal[]>(`${this.API_URL}/animals/enclosures/${id}`);
  }

  public getAnimalsBySpecies(id: number): Observable<Animal[]> {
    return this.http.get<Animal[]>(`${this.API_URL}/species/${id}/animals`);
  }

  public getSpeciesOfAnimal(
    id: string
  ): Observable<{ _id: string; espece: string; especeId: number }> {
    return this.http.get<{ _id: string; espece: string; especeId: number }>(
      `${this.API_URL}/animals/${id}/species`
    );
  }

  public careAnimal(id: string) {
    return this.http
      .post(`${this.API_URL}/animals/care/${id}`, null)
      .subscribe({
        next: (response) => {
          this.alerts.showAlert('#success-care');
          return response;
        },
        error: () => {
          this.alerts.showAlert('#fail-alert');
        },
      });
  }

  public moveAnimal(id: string, position: string) {
    if (position === 'dehors') {
      return this.http
        .post(`${this.API_URL}/animals/in/${id}`, null)
        .subscribe({
          next: (response) => {
            this.alerts.showAlert('#success-move');
            return response;
          },
          error: () => {
            this.alerts.showAlert('#fail-alert');
          },
        });
    } else {
      return this.http
        .post(`${this.API_URL}/animals/out/${id}`, null)
        .subscribe({
          next: (response) => {
            this.alerts.showAlert('#success-move');
            return response;
          },
          error: () => {
            this.alerts.showAlert('#fail-alert');
          },
        });
    }
  }
}
