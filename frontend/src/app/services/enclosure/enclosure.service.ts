import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Enclosure } from 'src/app/models/enclosure.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class EnclosureService {
  API_URL = environment.API_URL;

  constructor(private http: HttpClient) {}

  public getEnclosures(): Observable<Enclosure[]> {
    return this.http.get<Enclosure[]>(`${this.API_URL}/enclosures/`);
  }

  public getAnEnclosure(id: number): Observable<Enclosure> {
    return this.http.get<Enclosure>(`${this.API_URL}/enclosures/${id}`);
  }
}
