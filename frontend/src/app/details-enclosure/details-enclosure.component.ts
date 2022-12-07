import { Event } from './../models/event.model';
import { EnclosureService } from './../services/enclosure/enclosure.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Animal } from '../models/animal.model';
import { Enclosure } from '../models/enclosure.model';
import { AnimalService } from '../services/animal/animal.service';
import { EventService } from '../services/event/event.service';

@Component({
  selector: 'app-details-enclosure',
  templateUrl: './details-enclosure.component.html',
  styleUrls: ['./details-enclosure.component.css'],
})
export class DetailsEnclosureComponent implements OnInit {
  animals$: Observable<Animal[] | null> | undefined;
  events$: Observable<Event[] | null> | undefined;
  enclosure: Enclosure | undefined;
  enclosureId: string | null = this.route.snapshot.paramMap.get('id');

  constructor(
    private route: ActivatedRoute,
    private animalService: AnimalService,
    private enclosureService: EnclosureService,
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
}
