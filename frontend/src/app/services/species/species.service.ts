import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { Species } from 'src/app/models/species.model';
import { Event } from 'src/app/models/event.model';
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

  public feedAnimals(id: number) {
    return this.http
      .post(`${this.API_URL}/species/feed/${id}`, null)
      .subscribe({
        next: (response) => {
          document.querySelector('#success-feed')?.classList.remove('d-none');
          setTimeout(() => {
            document.querySelector('#success-feed')?.classList.add('d-none');
          }, 2000);
          console.log(response);
          return response;
        },
        error: () => {
          this.showAlert();
        },
      });
  }

  public stimulateAnimals(id: number) {
    return this.http
      .post(`${this.API_URL}/species/stimulate/${id}`, null)
      .subscribe({
        next: (response) => {
          document
            .querySelector('#success-stimulate')
            ?.classList.remove('d-none');
          setTimeout(() => {
            document
              .querySelector('#success-stimulate')
              ?.classList.add('d-none');
          }, 2000);
          console.log(response);
          return response;
        },
        error: () => {
          this.showAlert();
        },
      });
  }

  showAlert() {
    document.querySelector('#fail-alert')?.classList.remove('d-none');
    setTimeout(() => {
      document.querySelector('#fail-alert')?.classList.add('d-none');
    }, 2000);
  }

  public getEventsBySpecies(id: number): Observable<Event[]> {
    return this.http.get<Event[]>(`${this.API_URL}/events/species/${id}`).pipe(
      tap((results) => {
        results.sort(
          (a: Event, b: Event) =>
            new Date(b.date).getTime() - new Date(a.date).getTime()
        );
      })
    );
  }
}
