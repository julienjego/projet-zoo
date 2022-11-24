import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Animal } from './models/animal.model';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  API_URL = 'http://localhost:8888/api';

  constructor(private http: HttpClient) {}

  public getAnimals(): Observable<Animal[]> {
    return this.http.get<Animal[]>(`${this.API_URL}/animals/`);
  }

  public getAnimalWithEnclosure(animalId: string): Object {
    return this.http.get<Object>(
      `${this.API_URL}/animals/${animalId}/enclosure`
    );
  }
}
