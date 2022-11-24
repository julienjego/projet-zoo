import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Animal } from '../models/animal.model';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-list-animals',
  templateUrl: './list-animals.component.html',
  styleUrls: ['./list-animals.component.css'],
})
export class ListAnimalsComponent implements OnInit {
  animals$!: Observable<Animal[]>;
  animalsEnclosure!: Object;

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    this.getAnimals();
    this.animals$.forEach((animals) => {
      animals.forEach((a) => {
        a.id;
        console.log(a.id);
      });
    });
    // let animalId: string | null =
    // this.getAnimalsEnclosure(animalId);
  }

  public getAnimals() {
    return (this.animals$ = this.apiService.getAnimals());
  }

  public getAnimalsEnclosure(id: string) {
    this.animalsEnclosure = this.apiService.getAnimalsEnclosure(id);
  }
}
