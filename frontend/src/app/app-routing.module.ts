import { DashboardComponent } from './dashboard/dashboard.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { ListAnimalsComponent } from './list-animals/list-animals.component';
import { DetailsAnimalComponent } from './details-animal/details-animal.component';
import { DetailsEnclosureComponent } from './details-enclosure/details-enclosure.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'animals', component: ListAnimalsComponent },
  { path: 'animals/details/:id', component: DetailsAnimalComponent },
  { path: 'enclosures/details/:id', component: DetailsEnclosureComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: '', redirectTo: 'login', pathMatch: 'full' },
];

@NgModule({ imports: [RouterModule.forRoot(routes)], exports: [RouterModule] })
export class AppRoutingModule {}
