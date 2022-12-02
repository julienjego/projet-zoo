import { ShowAlerts } from './utils/showAlerts';
import { AuthGuard } from './services/auth/auth.guard';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
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
import { DashboardComponent } from './dashboard/dashboard.component';
import { DetailsEnclosureComponent } from './details-enclosure/details-enclosure.component';
import { AuthInterceptor } from './utils/auth-interceptor';
import { ListEnclosuresComponent } from './list-enclosures/list-enclosures.component';
import { ListSpeciesComponent } from './list-species/list-species.component';
import { SpeciesSociablePipe } from './pipes/species-sociable.pipe';
import { SpeciesSociableStringPipe } from './pipes/species-sociable-string.pipe';
import { DetailsSpeciesComponent } from './details-species/details-species.component';
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
    DashboardComponent,
    DetailsEnclosureComponent,
    ListEnclosuresComponent,
    ListSpeciesComponent,
    SpeciesSociablePipe,
    SpeciesSociableStringPipe,
    DetailsSpeciesComponent,
  ],
  imports: [BrowserModule, AppRoutingModule, HttpClientModule, FormsModule],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    AuthGuard,
    ShowAlerts,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
