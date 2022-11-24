import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { LoginComponent } from './login/login.component';
import { ListAnimalsComponent } from './list-animals/list-animals.component';
import { AppRoutingModule } from './app-routing.module';
import { DetailsAnimalComponent } from './details-animal/details-animal.component';
import { GenderColorPipe } from './pipes/gender-color.pipe';
import { GenderPipe } from './pipes/gender.pipe';
import { SpeciesFilterPipe } from './pipes/species-filter.pipe';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    LoginComponent,
    ListAnimalsComponent,
    DetailsAnimalComponent,
    GenderColorPipe,
    GenderPipe,
    SpeciesFilterPipe,
  ],
  imports: [BrowserModule, AppRoutingModule, HttpClientModule, FormsModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
