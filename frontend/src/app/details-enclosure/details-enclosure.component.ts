import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { ApiService } from '../api.service';
import { Animal } from '../models/animal.model';
import { Enclosure } from '../models/enclosure.model';

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
    private apiService: ApiService,
    private router: Router
  ) {}

  ngOnInit(): void {
    const enclosureId: string | null = this.route.snapshot.paramMap.get('id');

    if (enclosureId) {
      this.apiService
        .getAnEnclosure(+enclosureId)
        .subscribe((enclosure) => (this.enclosure = enclosure));

      this.getAnimalsByEnclosure(+enclosureId);
    }
  }

  public getAnimalsByEnclosure(id: number) {
    this.animals$ = this.apiService.getAnimalsByEnclosure(id);
  }

  public goToDetailsAnimal(animal: Animal) {
    this.router.navigate(['/animals/details', animal._id]);
  }
}
