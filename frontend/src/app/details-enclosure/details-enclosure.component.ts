import { EnclosureService } from './../services/enclosure/enclosure.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Animal } from '../models/animal.model';
import { Enclosure } from '../models/enclosure.model';
import { AnimalService } from '../services/animal/animal.service';

@Component({
  selector: 'app-details-enclosure',
  templateUrl: './details-enclosure.component.html',
  styleUrls: ['./details-enclosure.component.css'],
})
export class DetailsEnclosureComponent implements OnInit {
  animals$: Observable<Animal[] | null> | undefined;
  enclosure: Enclosure | undefined;

  constructor(
    private route: ActivatedRoute,
    private animalService: AnimalService,
    private enclosureService: EnclosureService,
    private router: Router
  ) {}

  ngOnInit(): void {
    const enclosureId: string | null = this.route.snapshot.paramMap.get('id');

    if (enclosureId) {
      this.enclosureService
        .getAnEnclosure(+enclosureId)
        .subscribe((enclosure) => (this.enclosure = enclosure));

      this.getAnimalsByEnclosure(+enclosureId);
    }
  }

  public getAnimalsByEnclosure(id: number) {
    this.animals$ = this.animalService.getAnimalsByEnclosure(id);
  }

  public goToDetailsAnimal(animal: Animal) {
    this.router.navigate(['/animals/details', animal._id]);
  }
}
