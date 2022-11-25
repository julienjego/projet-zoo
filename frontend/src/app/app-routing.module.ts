import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { ListAnimalsComponent } from './list-animals/list-animals.component';
import { DetailsAnimalComponent } from './details-animal/details-animal.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'animals', component: ListAnimalsComponent },
  { path: 'animals/details/:id', component: DetailsAnimalComponent },
  { path: '', redirectTo: 'login', pathMatch: 'full' },
];

@NgModule({ imports: [RouterModule.forRoot(routes)], exports: [RouterModule] })
export class AppRoutingModule {}
