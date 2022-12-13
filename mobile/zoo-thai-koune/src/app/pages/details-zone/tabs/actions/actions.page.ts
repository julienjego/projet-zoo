import { ActivatedRoute } from '@angular/router';
import { ActionService } from 'src/app/services/action/action.service';
import { Component, OnInit } from '@angular/core';
import { Action } from 'src/app/models/action.model';
import { Observable } from 'rxjs';
import { DetailsZonePage } from '../../details-zone.page';

@Component({
  selector: 'app-actions',
  templateUrl: './actions.page.html',
  styleUrls: ['./actions.page.scss'],
})
export class ActionsPage implements OnInit {
  actions$: Observable<Action[] | null> | undefined;
  actionsLength: number | undefined;
  zoneId: string | null = this.detailsZonePage.getId();

  constructor(
    private actionService: ActionService,
    private detailsZonePage: DetailsZonePage
  ) {}

  ngOnInit() {
    if (this.zoneId) {
      this.getActionsByZone(+this.zoneId, 'actions/zones');
    }
  }

  getActionsByZone(id: number, endpoint: string) {
    this.actions$ = this.actionService.getActions(id, endpoint);
    this.actions$.subscribe((results) => {
      this.actionsLength = results?.length;
    });
  }
}
