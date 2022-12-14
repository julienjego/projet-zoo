import { ActivatedRoute } from '@angular/router';
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
    public toastController: ToastController
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
    this.presentToast();
    this.getActionsByZone(+this.zoneId!, 'actions/zones');
  }

  async presentToast() {
    const toast = await this.toastController.create({
      message: 'Action effectuée !',
      duration: 2000,
    });
    toast.present();
  }
}
