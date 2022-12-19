import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class SpeciesService {
  API_URL = environment.API_URL;

  constructor(private http: HttpClient) {}

  public feedAnimals(id: number) {
    return this.http.post(`${this.API_URL}/species/feed/${id}`, null);
  }

  public stimulateAnimals(id: number) {
    return this.http.post(`${this.API_URL}/species/stimulate/${id}`, null);
  }
}
