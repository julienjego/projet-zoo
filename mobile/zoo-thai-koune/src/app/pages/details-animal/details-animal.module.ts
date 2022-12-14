import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DetailsAnimalPageRoutingModule } from './details-animal-routing.module';

import { DetailsAnimalPage } from './details-animal.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DetailsAnimalPageRoutingModule
  ],
  declarations: [DetailsAnimalPage]
})
export class DetailsAnimalPageModule {}
