import { ShowAlerts } from './../utils/showAlerts';
import { Action } from './../models/action.model';
import { EventService } from './../services/event/event.service';
import { AnimalService } from '../services/animal/animal.service';
import { Component, OnInit } from '@angular/core';
import { Animal } from '../models/animal.model';
import { Event } from '../models/event.model';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { ActionService } from '../services/action/action.service';
import { AuthService } from '../services/auth/auth.service';

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
  enclosureId!: number;
  animalId: string | null = this.route.snapshot.paramMap.get('id');
  role: string | null = localStorage.getItem('role');

  constructor(
    private route: ActivatedRoute,
    public authService: AuthService,
    private animalService: AnimalService,
    private eventService: EventService,
    private actionService: ActionService,
    private router: Router,
    private alerts: ShowAlerts
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
          this.enclosure = enclosure[0].enclosApp;
          this.enclosureId = enclosure[0].enclosId;
        });
    }
  }

  public getEventsByAnimal(id: string) {
    this.events$ = this.eventService.getEvents(id, 'events/animals');
  }

  public getActionsByAnimal(id: string | null) {
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

  public goToEnclosure() {
    this.router.navigate([`enclosures/details/${this.enclosureId}`]);
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

  public moveAnimal(id: string, position: string) {
    if (this.animalId) {
      this.animalService.moveAnimal(id, position).subscribe({
        next: (response: any) => {
          this.alerts.showAlert('#success-move');
          this.animal = response.animal;
        },
        error: () => {
          this.alerts.showAlert('#fail-alert');
        },
      });

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
      {
        nom: this.enclosure,
        _id: '',
        nomApp: '',
        zone: '',
        coordonnees: '',
        superficie: 0,
      },
      {
        nom: animal.espece,
        _id: '',
        nomApp: '',
        sociable: false,
        observations: '',
        dangereux: false,
        enclos: '',
      },
      animal,
      obs,
      date
    );
    this.getActionsByAnimal(this.animalId);
    document.querySelector<HTMLInputElement>('#actionInput')!.value = '';
    document.querySelector<HTMLInputElement>('#actionDate')!.value = '';
  }

  public deleteAction(action: Action) {
    if (this.animal) {
      if (action.observations === 'Soigner') {
        this.careAnimal();
      } else if (action.observations === 'Déplacer') {
        this.moveAnimal(this.animal._id, this.animal?.position);
      }
      this.actionService.deleteAction(action._id);
      this.getActionsByAnimal(this.animalId);
    }
  }
}
