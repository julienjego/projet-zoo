import { ApiService } from './../api.service';
import { Component, OnInit } from '@angular/core';
import { Animal } from '../models/animal.model';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-details-animal',
  templateUrl: './details-animal.component.html',
  styleUrls: ['./details-animal.component.css'],
})
export class DetailsAnimalComponent implements OnInit {
  animal: Animal | undefined;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private apiService: ApiService
  ) {}

  ngOnInit(): void {
    const animalId: string | null = this.route.snapshot.paramMap.get('id');

    if (animalId) {
      this.apiService
        .getAnAnimal(animalId)
        .subscribe((animal) => (this.animal = animal));
    }
  }
}
