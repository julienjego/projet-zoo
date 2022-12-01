import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Species } from '../models/species.model';
import { SpeciesService } from '../services/species/species.service';
import { Animal } from '../models/animal.model';

@Component({
  selector: 'app-list-species',
  templateUrl: './list-species.component.html',
  styleUrls: ['./list-species.component.css'],
})
export class ListSpeciesComponent implements OnInit {
  species$: Observable<Species[] | null> | undefined;

  constructor(private speciesService: SpeciesService, private router: Router) {}

  ngOnInit(): void {
    this.getSpecies();
  }

  public getSpecies() {
    this.species$ = this.speciesService.getSpecies();
  }

  public goToDetailsSpecies(specie: Species) {
    console.log(specie);
    this.router.navigate(['/species/details', specie._id]);
  }
}
