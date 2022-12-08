import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { Zone } from '../models/zone.model';
import { ZoneService } from '../services/zone/zone.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  zones$: Observable<Zone[] | null> | undefined;

  constructor(private zoneService: ZoneService, private router: Router) {}

  ngOnInit(): void {
    this.getEnclosures();
  }

  public getEnclosures() {
    this.zones$ = this.zoneService.getZones();
  }

  public goToDetailsZone(zone: Zone) {
    this.router.navigate(['/zones/details', zone._id]);
  }

  public getEnclosuresByZone(id: number) {
    this.zoneService.getEnclosuresByZone(id).subscribe((enclosures) => {
      console.log(enclosures.length);
    });
  }
}
