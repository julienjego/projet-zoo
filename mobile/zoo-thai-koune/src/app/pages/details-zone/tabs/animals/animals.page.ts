import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Animal } from 'src/app/models/animal.model';
import { AnimalService } from 'src/app/services/animal/animal.service';
import { DetailsZonePage } from '../../details-zone.page';

@Component({
  selector: 'app-animals',
  templateUrl: './animals.page.html',
  styleUrls: ['./animals.page.scss'],
})
export class AnimalsPage implements OnInit {
  animals$: Observable<Animal[] | null> | undefined;
  zoneId: string | null = this.detailsZonePage.getId();

  constructor(
    private animalService: AnimalService,
    private detailsZonePage: DetailsZonePage
  ) {}

  ngOnInit() {
    this.getAnimalsByZone();
  }

  getAnimalsByZone() {
    if (this.zoneId) {
      this.animals$ = this.animalService.getAnimalsByZone(+this.zoneId);
    }
  }
}
