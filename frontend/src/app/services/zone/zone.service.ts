import { Enclosure } from 'src/app/models/enclosure.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Zone } from '../../models/zone.model';

@Injectable({
  providedIn: 'root',
})
export class ZoneService {
  API_URL = environment.API_URL;

  constructor(private http: HttpClient) {}

  public getZones(): Observable<Zone[]> {
    return this.http.get<Zone[]>(`${this.API_URL}/zones/`);
  }

  public getAzone(id: number): Observable<Zone> {
    return this.http.get<Zone>(`${this.API_URL}/zones/${id}`);
  }

  public getEnclosuresByZone(id: number): Observable<Enclosure[]> {
    return this.http.get<Enclosure[]>(`${this.API_URL}/zones/${id}/enclosures`);
  }
}
