import { AnimalService } from './../services/animal/animal.service';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { ZoneService } from '../services/zone/zone.service';
import { Enclosure } from '../models/enclosure.model';
import { map, Observable } from 'rxjs';

@Component({
  selector: 'app-details-zone',
  templateUrl: './details-zone.component.html',
  styleUrls: ['./details-zone.component.css'],
})
export class DetailsZoneComponent implements OnInit {
  enclosures$: Observable<Enclosure[] | null> | undefined;
  zoneId: string | null = this.route.snapshot.paramMap.get('id');

  constructor(
    private zoneService: ZoneService,
    private route: ActivatedRoute,
    private animalService: AnimalService
  ) {}

  ngOnInit(): void {
    this.getEnclosuresByZone();
  }

  public getEnclosuresByZone() {
    this.enclosures$ = this.zoneService.getEnclosuresByZone(+this.zoneId!);
  }

  public getAnimalsByEnclosure() {
    this.enclosures$
      ?.pipe(
        map((item) => {
          return item;
        })
      )
      .subscribe((item) => {
        item?.forEach((i) => {
          console.log(i._id);
          console.log(
            this.animalService.getAnimalsByEnclosure(+i._id).subscribe((a) => {
              a.forEach((n) => {
                console.log(n.nom);
              });
            })
          );
        });
      });
    // this.enclosures$?.forEach((enclosure)=> {this.animalService.getAnimalsByEnclosure(enclosure._id);
    // })
  }
}
