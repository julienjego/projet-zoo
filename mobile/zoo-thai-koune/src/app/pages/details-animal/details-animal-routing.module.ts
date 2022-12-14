import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DetailsAnimalPage } from './details-animal.page';

const routes: Routes = [
  {
    path: '',
    component: DetailsAnimalPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DetailsAnimalPageRoutingModule {}
