import { ActionsPage } from './tabs/actions/actions.page';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-details-zone',
  templateUrl: './details-zone.page.html',
  styleUrls: ['./details-zone.page.scss'],
})
export class DetailsZonePage implements OnInit {
  private id: string | null = this.route.snapshot.paramMap.get('id');
  constructor(private route: ActivatedRoute) {}

  ngOnInit() {}

  public getId() {
    return this.id;
  }
}
