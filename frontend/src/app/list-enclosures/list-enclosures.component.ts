import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Enclosure } from '../models/enclosure.model';
import { EnclosureService } from '../services/enclosure/enclosure.service';

@Component({
  selector: 'app-list-enclosures',
  templateUrl: './list-enclosures.component.html',
  styleUrls: ['./list-enclosures.component.css'],
})
export class ListEnclosuresComponent implements OnInit {
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
    console.log(enclosure._id);
    this.router.navigate(['/enclosures/details', enclosure._id]);
  }
}
