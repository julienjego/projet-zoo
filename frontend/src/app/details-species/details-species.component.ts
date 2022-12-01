import { SpeciesService } from './../services/species/species.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Species } from './../models/species.model';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Animal } from '../models/animal.model';
import { Event } from '../models/event.model';
import { AnimalService } from '../services/animal/animal.service';

@Component({
  selector: 'app-details-species',
  templateUrl: './details-species.component.html',
  styleUrls: ['./details-species.component.css'],
})
export class DetailsSpeciesComponent implements OnInit {
  animals$: Observable<Animal[] | null> | undefined;
  events$: Observable<Event[] | null> | undefined;
  species: Species | undefined;

  constructor(
    private route: ActivatedRoute,
    private speciesService: SpeciesService,
    private animalService: AnimalService,
    private router: Router
  ) {}

  ngOnInit(): void {
    const speciesId: string | null = this.route.snapshot.paramMap.get('id');

    if (speciesId) {
      this.speciesService
        .getASpecies(+speciesId)
        .subscribe((species) => (this.species = species));

      this.getAnimalsBySpecies(+speciesId);
      this.getEventsBySpecies(+speciesId);
    }
  }

  public getAnimalsBySpecies(id: number) {
    this.animals$ = this.animalService.getAnimalsBySpecies(id);
  }

  public goToDetailsAnimal(animal: Animal) {
    this.router.navigate(['/animals/details', animal._id]);
  }

  public feedAnimals() {
    const speciesId: string | null = this.route.snapshot.paramMap.get('id');
    if (speciesId) {
      this.speciesService.feedAnimals(+speciesId);
    }
  }

  public stimulateAnimals() {
    const speciesId: string | null = this.route.snapshot.paramMap.get('id');
    if (speciesId) {
      this.speciesService.stimulateAnimals(+speciesId);
    }
  }

  public getEventsBySpecies(id: number) {
    this.events$ = this.speciesService.getEventsBySpecies(id);
  }
}
