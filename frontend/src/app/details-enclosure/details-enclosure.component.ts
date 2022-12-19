import { Event } from './../models/event.model';
import { EnclosureService } from './../services/enclosure/enclosure.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Animal } from '../models/animal.model';
import { Enclosure } from '../models/enclosure.model';
import { AnimalService } from '../services/animal/animal.service';
import { EventService } from '../services/event/event.service';
import { Action } from '../models/action.model';
import { ActionService } from '../services/action/action.service';

@Component({
  selector: 'app-details-enclosure',
  templateUrl: './details-enclosure.component.html',
  styleUrls: ['./details-enclosure.component.css'],
})
export class DetailsEnclosureComponent implements OnInit {
  animals$: Observable<Animal[] | null> | undefined;
  events$: Observable<Event[] | null> | undefined;
  actions$: Observable<Action[] | null> | undefined;
  enclosure: Enclosure | undefined;
  enclosureId: string | null = this.route.snapshot.paramMap.get('id');
  role: string | null = localStorage.getItem('role');

  constructor(
    private route: ActivatedRoute,
    private animalService: AnimalService,
    private enclosureService: EnclosureService,
    private actionService: ActionService,
    private router: Router,
    private eventService: EventService
  ) {}

  ngOnInit(): void {
    if (this.enclosureId) {
      this.enclosureService
        .getAnEnclosure(+this.enclosureId)
        .subscribe((enclosure) => (this.enclosure = enclosure));

      this.getAnimalsByEnclosure(+this.enclosureId);
      this.getEventsByEnclosure(+this.enclosureId);
      this.getActionsByEnclosure(+this.enclosureId);
    }
  }

  getEventsByEnclosure(id: number) {
    this.events$ = this.eventService.getEvents(id, 'events/enclosures');
  }

  public getAnimalsByEnclosure(id: number) {
    this.animals$ = this.animalService.getAnimalsByEnclosure(id);
  }

  public goToDetailsAnimal(animal: Animal) {
    this.router.navigate(['/animals/details', animal._id]);
  }

  public verifyEnclosure(id: number) {
    if (this.enclosureId) {
      this.enclosureService.verifyEnclosure(id);
      this.events$ = this.eventService.getEvents(id, 'events/enclosures');
    }
  }

  public getActionsByEnclosure(id: number) {
    this.actions$ = this.actionService.getActions(id, 'actions/enclosures');
  }

  public createAction() {
    if (this.enclosure) {
      const obs: string =
        document.querySelector<HTMLInputElement>('#actionInput')!.value;

      const date: string =
        document.querySelector<HTMLInputElement>('#actionDate')!.value;

      this.actionService.createAction(
        this.enclosure,
        {
          nom: this.enclosure.nom,
          _id: '',
          nomApp: '',
          sociable: false,
          observations: '',
          dangereux: false,
          enclos: '',
        },
        {
          nom: this.enclosure.nom,
          _id: '',
          espece: '',
          naissance: '',
          deces: '',
          sexe: '',
          observations: '',
          position: '',
          enclos: '',
        },
        obs,
        date
      );
      this.getActionsByEnclosure(+this.enclosureId!);
      document.querySelector<HTMLInputElement>('#actionInput')!.value = '';
      document.querySelector<HTMLInputElement>('#actionDate')!.value = '';
    }
  }

  public deleteAction(action: Action) {
    if (this.enclosureId) {
      if (action.observations === 'Vérifier') {
        this.verifyEnclosure(+this.enclosureId);
      }
      this.actionService.deleteAction(action._id);
      this.getActionsByEnclosure(+this.enclosureId);
    }
  }
}
