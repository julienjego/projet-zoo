import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { Animal } from 'src/app/models/animal.model';
import { environment } from 'src/environments/environment';
import { Event } from 'src/app/models/event.model';

@Injectable({
  providedIn: 'root',
})
export class AnimalService {
  API_URL = environment.API_URL;

  constructor(private http: HttpClient) {}

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

  public getEventsByAnimal(id: string): Observable<Event[]> {
    return this.http.get<Event[]>(`${this.API_URL}/events/animals/${id}`).pipe(
      tap((results) => {
        results.sort(
          (a: Event, b: Event) =>
            new Date(b.date).getTime() - new Date(a.date).getTime()
        );
      })
    );
  }
}
