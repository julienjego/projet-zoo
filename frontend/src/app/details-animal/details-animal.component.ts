import { Action } from './../models/action.model';
import { EventService } from './../services/event/event.service';
import { AnimalService } from '../services/animal/animal.service';
import { Component, OnInit } from '@angular/core';
import { Animal } from '../models/animal.model';
import { Event } from '../models/event.model';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { ActionService } from '../services/action/action.service';

@Component({
  selector: 'app-details-animal',
  templateUrl: './details-animal.component.html',
  styleUrls: ['./details-animal.component.css'],
})
export class DetailsAnimalComponent implements OnInit {
  animal: Animal | undefined;
  events$: Observable<Event[] | null> | undefined;
  actions$: Observable<Action[] | null> | undefined;
  enclosure!: string;
  animalId: string | null = this.route.snapshot.paramMap.get('id');

  constructor(
    private route: ActivatedRoute,
    private animalService: AnimalService,
    private eventService: EventService,
    private actionService: ActionService,
    private router: Router
  ) {}

  ngOnInit(): void {
    if (this.animalId) {
      this.animalService
        .getAnAnimal(this.animalId)
        .subscribe((animal) => (this.animal = animal));

      this.getEventsByAnimal(this.animalId);
      this.getActionsByAnimal(this.animalId);

      this.animalService
        .getEnclosureofAnimal(this.animalId)
        .subscribe((enclosure) => {
          this.enclosure = enclosure[0].enclos;
        });
    }
  }

  public getEventsByAnimal(id: string) {
    this.events$ = this.eventService.getEvents(id, 'events/animals');
  }

  public getActionsByAnimal(id: string) {
    this.actions$ = this.actionService.getActions(id, 'actions/animals');
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
    if (this.animalId) {
      this.animalService.careAnimal(this.animalId);
      this.events$ = this.eventService.getEvents(
        this.animalId,
        'events/animals'
      );
    }
  }

  // TODO Update view when animal is moved
  public moveAnimal(id: string, position: string) {
    if (this.animalId) {
      this.animalService.moveAnimal(id, position);
      this.events$ = this.eventService.getEvents(
        this.animalId,
        'events/animals'
      );
    }
  }

  public createAction(animal: Animal) {
    const obs: string =
      document.querySelector<HTMLInputElement>('#actionInput')!.value;
    const date: string =
      document.querySelector<HTMLInputElement>('#actionDate')!.value;

    this.actionService.createAction(
      this.enclosure,
      animal.espece,
      animal.nom,
      obs,
      date
    );
  }
}
