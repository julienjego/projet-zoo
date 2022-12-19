import { Toasts } from 'src/app/utils/toasts';

import { ActionService } from 'src/app/services/action/action.service';
import { Component, OnInit } from '@angular/core';
import { Action } from 'src/app/models/action.model';
import { Observable } from 'rxjs';
import { DetailsZonePage } from '../../details-zone.page';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-actions',
  templateUrl: './actions.page.html',
  styleUrls: ['./actions.page.scss'],
})
export class ActionsPage implements OnInit {
  actions$: Observable<Action[] | null> | undefined;
  zoneId: string | null = this.detailsZonePage.getId();

  constructor(
    private actionService: ActionService,
    private detailsZonePage: DetailsZonePage,
    public toastController: ToastController,
    private toast: Toasts
  ) {}

  ngOnInit() {
    if (this.zoneId) {
      this.getActionsByZone(+this.zoneId, 'actions/zones');
    }
  }

  getActionsByZone(id: number, endpoint: string) {
    this.actions$ = this.actionService.getActions(id, endpoint);
  }

  deleteAction(action: Action) {
    this.actionService.deleteAction(action._id);
    this.toast.presentToast('Action effectuée !');
    this.getActionsByZone(+this.zoneId!, 'actions/zones');
  }
}
