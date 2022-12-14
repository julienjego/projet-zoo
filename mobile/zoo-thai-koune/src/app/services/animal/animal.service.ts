import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { Animal } from 'src/app/models/animal.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AnimalService {
  API_URL = environment.API_URL;

  constructor(private http: HttpClient) {}

  public getAnimalsByZone(id: number): Observable<Animal[]> {
    return this.http.get<Animal[]>(`${this.API_URL}/animals/zones/${id}`);
  }
}
