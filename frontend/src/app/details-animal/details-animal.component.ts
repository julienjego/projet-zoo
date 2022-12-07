import { Action } from './../models/action.model';
import { EventService } from './../services/event/event.service';
import { AnimalService } from '../services/animal/animal.service';
import { Component, OnInit } from '@angular/core';
import { Animal } from '../models/animal.model';
import { Event } from '../models/event.model';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { ActionService } from '../services/action/action.service';
import { Enclosure } from '../models/enclosure.model';

@Component({
  selector: 'app-details-animal',
  templateUrl: './details-animal.component.html',
  styleUrls: ['./details-animal.component.css'],
})
export class DetailsAnimalComponent implements OnInit {
  animal: Animal | undefined;
  events$: Observable<Event[] | null> | undefined;
  actions$: Observable<Action[] | null> | undefined;
  enclosure: Enclosure | undefined;
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

  //TODO continuer création action
  public getNewAction(animal: Animal) {
    let enclos: string;

    this.animalService
      .getEnclosureofAnimal(animal._id)
      .subscribe((enclosure) => {
        enclos = enclosure[0].enclos;
      });

    console.log(animal);
    console.log(
      document.querySelector<HTMLInputElement>('#actionInput')?.value
    );

    console.log(document.querySelector<HTMLInputElement>('#actionDate')?.value);
  }
}
