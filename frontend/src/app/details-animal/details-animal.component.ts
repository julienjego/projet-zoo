import { EventService } from './../services/event/event.service';
import { AnimalService } from '../services/animal/animal.service';
import { Component, OnInit } from '@angular/core';
import { Animal } from '../models/animal.model';
import { Event } from '../models/event.model';
import { Species } from '../models/species.model';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-details-animal',
  templateUrl: './details-animal.component.html',
  styleUrls: ['./details-animal.component.css'],
})
export class DetailsAnimalComponent implements OnInit {
  animal: Animal | undefined;
  events$: Observable<Event[] | null> | undefined;

  constructor(
    private route: ActivatedRoute,
    private animalService: AnimalService,
    private eventService: EventService,
    private router: Router
  ) {}

  ngOnInit(): void {
    const animalId: string | null = this.route.snapshot.paramMap.get('id');

    if (animalId) {
      this.animalService
        .getAnAnimal(animalId)
        .subscribe((animal) => (this.animal = animal));

      this.getEventsByAnimal(animalId);
    }
  }

  public getEventsByAnimal(id: string) {
    this.events$ = this.eventService.getEvents(id, 'events/animals');
  }

  public goToSpecies(animal: Animal) {
    this.animalService
      .getSpeciesOfAnimal(animal._id)
      .subscribe((specie: { [index: number]: any }) => {
        const speciesId: number = specie[0].especeId;
        this.router.navigate([`species/details/${speciesId}`]);
      });
  }

  public careAnimal() {
    const animalId: string | null = this.route.snapshot.paramMap.get('id');
    if (animalId) {
      this.animalService.careAnimal(animalId);
      this.events$ = this.eventService.getEvents(animalId, 'events/animals');
    }
  }

  // TODO Update view when animal is moved
  public moveAnimal(id: string, position: string) {
    this.animalService.moveAnimal(id, position);
    this.events$ = this.eventService.getEvents(id, 'events/animals');
  }
}
