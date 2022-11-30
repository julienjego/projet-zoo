import { DashboardComponent } from './dashboard/dashboard.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { ListAnimalsComponent } from './list-animals/list-animals.component';
import { DetailsAnimalComponent } from './details-animal/details-animal.component';
import { DetailsEnclosureComponent } from './details-enclosure/details-enclosure.component';
import { AuthGuard } from './services/auth.guard';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  {
    path: 'animals',
    component: ListAnimalsComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'animals/details/:id',
    component: DetailsAnimalComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'enclosures/details/:id',
    component: DetailsEnclosureComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [AuthGuard],
  },
  { path: '', redirectTo: 'login', pathMatch: 'full' },
];

@NgModule({ imports: [RouterModule.forRoot(routes)], exports: [RouterModule] })
export class AppRoutingModule {}
