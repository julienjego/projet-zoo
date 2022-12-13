import { ActionsPage } from './tabs/actions/actions.page';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DetailsZonePageRoutingModule } from './details-zone-routing.module';

import { DetailsZonePage } from './details-zone.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DetailsZonePageRoutingModule,
  ],
  declarations: [DetailsZonePage],
  providers: [ActionsPage],
})
export class DetailsZonePageModule {}
