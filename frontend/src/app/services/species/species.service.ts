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

  constructor(private http: HttpClient) {}

  public getSpecies(): Observable<Species[]> {
    return this.http.get<Species[]>(`${this.API_URL}/species/`);
  }

  public getASpecies(id: number): Observable<Species> {
    return this.http.get<Species>(`${this.API_URL}/species/${id}`);
  }
}
