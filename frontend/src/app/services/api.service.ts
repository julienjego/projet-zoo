import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Animal } from '../models/animal.model';
import { Species } from '../models/species.model';
import { Enclosure } from '../models/enclosure.model';
import { Event } from '../models/event.model';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  API_URL = 'http://localhost:8888/api';

  constructor(private http: HttpClient) {}

  public getAnimals(): Observable<Animal[]> {
    return this.http.get<Animal[]>(`${this.API_URL}/animals/`);
  }

  public getAnAnimal(id: string): Observable<Animal> {
    return this.http.get<Animal>(`${this.API_URL}/animals/${id}`);
  }

  public getSpecies(): Observable<Species[]> {
    return this.http.get<Species[]>(`${this.API_URL}/species/`);
  }

  public getEnclosures(): Observable<Enclosure[]> {
    return this.http.get<Enclosure[]>(`${this.API_URL}/enclosures/`);
  }

  public getAnEnclosure(id: number): Observable<Enclosure> {
    return this.http.get<Enclosure>(`${this.API_URL}/enclosures/${id}`);
  }

  public getAnimalsByEnclosure(id: number): Observable<Animal[]> {
    return this.http.get<Animal[]>(`${this.API_URL}/animals/enclosures/${id}`);
  }

  public getEventsByAnimal(id: string): Observable<Event[]> {
    return this.http.get<Event[]>(`${this.API_URL}/events/animals/${id}`);
  }
}
