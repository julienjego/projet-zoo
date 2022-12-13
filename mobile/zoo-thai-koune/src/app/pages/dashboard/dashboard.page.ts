import { Observable } from 'rxjs';
import { ZoneService } from 'src/app/services/zone/zone.service';
import { Component, OnInit } from '@angular/core';
import { Zone } from 'src/app/models/zone.model';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage implements OnInit {
  zones$: Observable<Zone[] | null> | undefined;
  constructor(private zoneService: ZoneService) {}

  ngOnInit() {
    this.getZones();
  }

  getZones() {
    this.zones$ = this.zoneService.getZones();
  }

  goToZone(id: number) {
    console.log(id);
  }
}
