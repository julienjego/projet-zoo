import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Animal } from './models/animal.model';
import { Species } from './models/species.model';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  API_URL = 'http://localhost:8888/api';

  constructor(private http: HttpClient) {}

  public getAnimals(): Observable<Animal[]> {
    return this.http.get<Animal[]>(`${this.API_URL}/animals/`);
  }

  public getSpecies(): Observable<Species[]> {
    return this.http.get<Species[]>(`${this.API_URL}/species/`);
  }
}
