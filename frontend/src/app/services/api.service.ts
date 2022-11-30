import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { Animal } from '../models/animal.model';
import { Species } from '../models/species.model';
import { Enclosure } from '../models/enclosure.model';
import { Event } from '../models/event.model';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  API_URL = environment.API_URL;

  constructor(private http: HttpClient) {}
}
