import { IActionData } from './../../../../models/action-data.model';
import { Enclosure } from 'src/app/models/enclosure.model';
import { Animal } from 'src/app/models/animal.model';
import { Species } from 'src/app/models/species.model';
import { EnclosureService } from 'src/app/services/enclosure/enclosure.service';
import { SpeciesService } from 'src/app/services/species/species.service';
import { AnimalService } from 'src/app/services/animal/animal.service';
import { Toasts } from 'src/app/utils/toasts';
import { ActionService } from 'src/app/services/action/action.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Action } from 'src/app/models/action.model';
import { Observable } from 'rxjs';
import { DetailsZonePage } from '../../details-zone.page';
import { IonModal, ToastController } from '@ionic/angular';
import { OverlayEventDetail } from '@ionic/core/components';
import { ZoneService } from 'src/app/services/zone/zone.service';
import { ActionCreator } from 'src/app/utils/action-creator';

@Component({
  selector: 'app-actions',
  templateUrl: './actions.page.html',
  styleUrls: ['./actions.page.scss'],
})
export class ActionsPage implements OnInit {
  actions$: Observable<Action[] | null> | undefined;
  enclosures$: Observable<Enclosure[] | null> | undefined;
  animals$: Observable<Animal[] | null> | undefined;
  species$: Observable<Species[] | null> | undefined;
  zoneId: string | null = this.detailsZonePage.getId();
  place!: string;
  enclosure!: Enclosure | undefined;
  species!: Species | undefined;
  animal!: Animal | undefined;
  action!: string;
  date!: string;
  isNotClicked: boolean = true;
  isNotFinished: boolean = true;

  constructor(
    private actionService: ActionService,
    private animalService: AnimalService,
    private speciesService: SpeciesService,
    private enclosureService: EnclosureService,
    private zoneService: ZoneService,
    private detailsZonePage: DetailsZonePage,
    public toastController: ToastController,
    private toast: Toasts,
    private actionCreator: ActionCreator
  ) {}

  ngOnInit() {
    if (this.zoneId) {
      this.getActionsByZone(+this.zoneId, 'actions/zones');
      this.getEnclosuresByZone(+this.zoneId);
      this.getAnimalsByZone(+this.zoneId);
      this.getSpeciesByZone(+this.zoneId);
    }
  }

  getActionsByZone(id: number, endpoint: string) {
    this.actions$ = this.actionService.getActions(id, endpoint);
  }

  getEnclosuresByZone(id: number) {
    this.enclosures$ = this.zoneService.getEnclosuresByZone(id);
  }

  getAnimalsByZone(id: number) {
    this.animals$ = this.animalService.getAnimalsByZone(id);
  }

  getSpeciesByZone(id: number) {
    this.species$ = this.speciesService.getSpeciesByZone(id);
  }

  careAnimal(id: string) {
    this.animalService
      .careAnimal(id)
      .subscribe({ next: (response) => response, error: (error) => error });
  }

  moveAnimal(id: string, position: string) {
    this.animalService
      .moveAnimal(id, position)
      .subscribe({ next: (response) => response, error: (error) => error });
  }

  feedAnimals(id: number) {
    this.speciesService
      .feedAnimals(id)
      .subscribe({ next: (response) => response, error: (error) => error });
  }

  stimulateAnimals(id: number) {
    this.speciesService
      .stimulateAnimals(id)
      .subscribe({ next: (response) => response, error: (error) => error });
  }

  moveAnimals() {}

  verifyEnclosure(id: number) {
    this.enclosureService
      .verifyEnclosure(id)
      .subscribe({ next: (response) => response, error: (error) => error });
  }

  doAction(action: Action) {
    if (action) {
      switch (action.observations) {
        case 'Soigner':
          this.careAnimal(action.animal._id);
          break;
        case 'Déplacer':
          this.moveAnimal(action.animal._id, action.animal.position);
          break;
        case 'Nourrir':
          this.feedAnimals(+action.espece._id);
          break;
        case 'Stimuler':
          this.stimulateAnimals(+action.espece._id);
          break;
        case 'Vérifier':
          this.verifyEnclosure(+action.enclos._id);
          break;
      }
      this.actionService.deleteAction(action._id);
      this.toast.presentToast('Action effectuée !');
      this.getActionsByZone(+this.zoneId!, 'actions/zones');
    }
  }

  createAction(response: string | undefined) {
    if (response) {
      const obj: IActionData = JSON.parse(JSON.stringify(response));
      this.actionCreator.createAction(obj);
    }
  }

  @ViewChild(IonModal) modal!: IonModal;
  cancel() {
    this.place = '';
    this.date = '';
    this.enclosure = undefined;
    this.species = undefined;
    this.animal = undefined;
    this.isNotClicked = true;
    this.isNotFinished = true;
    this.modal.dismiss(null, 'cancel');
  }

  confirm() {
    this.modal.dismiss(
      {
        enclos: this.enclosure,
        espece: this.species,
        animal: this.animal,
        observations: this.action,
        date: this.date,
      },
      'confirm'
    );
    this.place = '';
    this.date = '';
    this.enclosure = undefined;
    this.species = undefined;
    this.animal = undefined;
    this.isNotClicked = true;
    this.isNotFinished = true;
  }

  onWillDismiss(event: Event) {
    const ev = event as CustomEvent<OverlayEventDetail<string>>;
    if (ev.detail.role === 'confirm') {
      this.createAction(ev.detail.data);
      this.getActionsByZone(+this.zoneId!, 'actions/zones');
    }
  }

  onPlaceChange(e: Event) {
    this.isNotClicked = true;
    this.place = (e.target as HTMLInputElement).value;
  }

  onActionChange(e: Event) {
    this.action = (e.target as HTMLInputElement).value;
  }

  onDateChange(e: Event) {
    this.isNotFinished = false;
    this.date = (e.target as HTMLInputElement).value;
  }

  onChange(e: Event, type: string) {
    let eventAim: Object | undefined;
    this.isNotClicked = false;

    switch (type) {
      case 'enclos':
        eventAim = this.enclosure;
        break;
      case 'espece':
        eventAim = this.species;
        break;
      case 'animal':
        eventAim = this.animal;
    }

    eventAim = JSON.parse(JSON.stringify((e.target as HTMLInputElement).value));
  }
}
