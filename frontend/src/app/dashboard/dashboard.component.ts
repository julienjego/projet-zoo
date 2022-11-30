import { EnclosureService } from './../services/enclosure/enclosure.service';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Enclosure } from '../models/enclosure.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  enclosures$: Observable<Enclosure[] | null> | undefined;

  constructor(
    private enclosureService: EnclosureService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getEnclosures();
  }

  public getEnclosures() {
    this.enclosures$ = this.enclosureService.getEnclosures();
  }

  public goToDetailsEnclosure(enclosure: Enclosure) {
    this.router.navigate(['/enclosures/details', enclosure._id]);
  }
}
