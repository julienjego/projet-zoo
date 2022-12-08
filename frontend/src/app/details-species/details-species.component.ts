import { EventService } from './../services/event/event.service';
import { SpeciesService } from './../services/species/species.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Species } from './../models/species.model';
import { Component, Input, OnInit } from '@angular/core';
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
  animalsMoving: any[] = [];
  animalsMovingId: string[] = [];
  chksOk: boolean = false;
  speciesId: string | null = this.route.snapshot.paramMap.get('id');

  constructor(
    private route: ActivatedRoute,
    private speciesService: SpeciesService,
    private animalService: AnimalService,
    private eventService: EventService,
    private router: Router
  ) {}

  ngOnInit(): void {
    if (this.speciesId) {
      this.speciesService
        .getASpecies(+this.speciesId)
        .subscribe((species) => (this.species = species));

      this.getAnimalsBySpecies(+this.speciesId);
      this.getEventsBySpecies(+this.speciesId);
    }
  }

  getAnimalsBySpecies(id: number) {
    this.animals$ = this.animalService.getAnimalsBySpecies(id);
  }

  goToDetailsAnimal(animal: Animal) {
    this.router.navigate(['/animals/details', animal._id]);
  }

  goToListSpecies() {
    this.router.navigate(['/species']);
  }

  goToEnclosure() {}

  feedAnimals() {
    if (this.speciesId) {
      this.speciesService.feedAnimals(+this.speciesId);
      this.events$ = this.eventService.getEvents(
        this.speciesId,
        'events/species'
      );
    }
  }

  stimulateAnimals() {
    if (this.speciesId) {
      this.speciesService.stimulateAnimals(+this.speciesId);
      this.events$ = this.eventService.getEvents(
        this.speciesId,
        'events/species'
      );
    }
  }

  getEventsBySpecies(id: number) {
    this.events$ = this.eventService.getEvents(id, 'events/species');
  }

  moveAnimals() {
    if (this.speciesId) {
      this.animalsMoving.forEach((a) => {
        let obj = JSON.parse(a);
        this.speciesService.moveAnimals(obj.animal.id, obj.animal.position);
      });
      this.events$ = this.eventService.getEvents(
        this.speciesId,
        'events/species'
      );
      this.animals$ = this.animalService.getAnimalsBySpecies(+this.speciesId);
      this.chksOk = false;
    }
  }

  // Fonction pour récupérer les événements liés aux checkboxes
  cbxChange(selected: any): void {
    let obj = JSON.parse(selected.target.value);
    if (selected.target.checked) {
      this.animalsMoving.push(selected.target.value);
      this.animalsMovingId.push(obj.animal.id);
    } else {
      let index = this.animalsMoving.indexOf(selected.target.value);
      let indexId = this.animalsMovingId.indexOf(obj.animal.id);
      if (index !== -1 && indexId !== -1) {
        this.animalsMoving.splice(index, 1);
        this.animalsMovingId.splice(indexId, 1);
      }
    }
    this.validateChks();
  }

  //Fonction pour compter le nombre de checkboxes sélectionné et afficher ou non le bouton "Déplacement"
  validateChks() {
    var checked = 0;

    var chks: HTMLInputElement[] = document.querySelectorAll(
      '.input-moving'
    ) as unknown as HTMLInputElement[];

    for (var i = 0; i < chks.length; i++) {
      if (chks[i].checked) {
        checked++;
      }
    }

    if (checked > 0) {
      this.chksOk = true;
    } else {
      this.chksOk = false;
    }
  }
}
