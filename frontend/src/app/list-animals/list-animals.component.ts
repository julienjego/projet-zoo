import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Animal } from '../models/animal.model';
import { ApiService } from '../api.service';
import { Species } from '../models/species.model';

@Component({
  selector: 'app-list-animals',
  templateUrl: './list-animals.component.html',
  styleUrls: ['./list-animals.component.css'],
})
export class ListAnimalsComponent implements OnInit {
  animals$: Observable<Animal[] | null> | undefined;
  species$: Observable<Species[] | null> | undefined;
  species!: string;

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    this.getAnimals();
    this.getSpecies();
  }

  public getAnimals() {
    this.animals$ = this.apiService.getAnimals();
  }

  public getSpecies() {
    this.species$ = this.apiService.getSpecies();
  }
}
