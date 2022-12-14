import { Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { AnimalService } from 'src/app/services/animal/animal.service';
import { Animal } from 'src/app/models/animal.model';
import { DetailsZonePage } from '../details-zone/details-zone.page';
import { Location } from '@angular/common';

@Component({
  selector: 'app-details-animal',
  templateUrl: './details-animal.page.html',
  styleUrls: ['./details-animal.page.scss'],
})
export class DetailsAnimalPage implements OnInit {
  animalId: string | null = this.route.snapshot.paramMap.get('id');
  animal: Animal | null | undefined;

  constructor(
    private route: ActivatedRoute,
    private animalService: AnimalService,
    private location: Location
  ) {}

  ngOnInit() {
    if (this.animalId) {
      this.animalService
        .getAnAnimal(this.animalId)
        .subscribe((animal) => (this.animal = animal));
    }
  }

  goBack() {
    window.history.back();
  }
}
