import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DetailsZonePage } from './details-zone.page';

const routes: Routes = [
  {
    path: '',
    component: DetailsZonePage,
    children: [
      {
        path: 'actions',
        loadChildren: () =>
          import('./tabs/actions/actions.module').then(
            (m) => m.ActionsPageModule
          ),
      },
      {
        path: 'events',
        loadChildren: () =>
          import('./tabs/events/events.module').then((m) => m.EventsPageModule),
      },
      {
        path: 'animals',
        loadChildren: () =>
          import('./tabs/animals/animals.module').then(
            (m) => m.AnimalsPageModule
          ),
      },
      {
        path: '',
        redirectTo: 'actions',
        pathMatch: 'full',
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DetailsZonePageRoutingModule {}
