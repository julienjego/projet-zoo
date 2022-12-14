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

  public getAnAnimal(id: string): Observable<Animal> {
    return this.http.get<Animal>(`${this.API_URL}/animals/${id}`);
  }

  public getAnimalsByZone(id: number): Observable<Animal[]> {
    return this.http.get<Animal[]>(`${this.API_URL}/animals/zones/${id}`);
  }

  public getEnclosureofAnimal(
    id: string
  ): Observable<{ enclosId: number; espece: string; enclosApp: string }[]> {
    return this.http.get<
      { enclosId: number; espece: string; enclosApp: string }[]
    >(`${this.API_URL}/animals/${id}/enclosure`);
  }

  public careAnimal(id: string) {
    return this.http.post(`${this.API_URL}/animals/care/${id}`, null);
  }

  public moveAnimal(id: string, position: string) {
    if (position === 'dehors') {
      return this.http.post(`${this.API_URL}/animals/in/${id}`, null);
    } else {
      return this.http.post(`${this.API_URL}/animals/out/${id}`, null);
    }
  }
}
