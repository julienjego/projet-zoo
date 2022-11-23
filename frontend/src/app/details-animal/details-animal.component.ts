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

  constructor() {}

  ngOnInit(): void {}
}
