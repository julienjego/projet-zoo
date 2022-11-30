import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Animal } from '../models/animal.model';
import { AnimalService } from '../services/animal/animal.service';
import { SpeciesService } from '../services/species/species.service';
import { Species } from '../models/species.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-list-animals',
  templateUrl: './list-animals.component.html',
  styleUrls: ['./list-animals.component.css'],
})
export class ListAnimalsComponent implements OnInit {
  animals$: Observable<Animal[] | null> | undefined;
  species$: Observable<Species[] | null> | undefined;
  species!: string;

  constructor(
    private animalService: AnimalService,
    private speciesService: SpeciesService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getAnimals();
    this.getSpecies();
  }

  public getAnimals() {
    this.animals$ = this.animalService.getAnimals();
  }

  public getSpecies() {
    this.species$ = this.speciesService.getSpecies();
  }

  public goToDetailsAnimal(animal: Animal) {
    this.router.navigate(['/animals/details', animal._id]);
  }
}
