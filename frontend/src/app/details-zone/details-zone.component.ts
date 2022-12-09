import { AnimalService } from './../services/animal/animal.service';
import { ActivatedRoute, Router } from '@angular/router';
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
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getEnclosuresByZone();
  }

  public getEnclosuresByZone() {
    this.enclosures$ = this.zoneService.getEnclosuresByZone(+this.zoneId!);
  }

  public goToEnclosure(id: string) {
    this.router.navigate([`/enclosures/details/${+id}`]);
  }
}
