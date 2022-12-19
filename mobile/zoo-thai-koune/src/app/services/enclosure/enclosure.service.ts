import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class EnclosureService {
  API_URL = environment.API_URL;

  constructor(private http: HttpClient) {}

  public verifyEnclosure(id: number) {
    return this.http.post(`${this.API_URL}/enclosures/verify/${id}`, null);
  }
}
