import { AnimalService } from '../services/animal/animal.service';
import { Component, OnInit } from '@angular/core';
import { Animal } from '../models/animal.model';
import { Event } from '../models/event.model';
import { ActivatedRoute } from '@angular/router';
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
    private animalService: AnimalService
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
    this.events$ = this.animalService.getEventsByAnimal(id);
  }
}
