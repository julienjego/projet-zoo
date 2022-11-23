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

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    this.getAnimals();
  }

  public getAnimals() {
    this.animals$ = this.apiService.getAnimals();
  }
}
