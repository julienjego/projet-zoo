import { ActionService } from 'src/app/services/action/action.service';
import { IActionData } from './../models/action-data.model';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ActionCreator {
  constructor(private actionService: ActionService) {}
  createAction(obj: IActionData) {
    if (obj.enclos) {
      console.log('enclos');
      this.enclosureAction(obj);
    } else if (obj.espece) {
      console.log('espece');
    } else if (obj.animal) {
      console.log('animal');
    }
  }

  enclosureAction(obj: IActionData) {
    this.actionService.createAction(
      obj.enclos,
      {
        nom: obj.enclos.nom,
        _id: '',
        nomApp: '',
        sociable: false,
        observations: '',
        dangereux: false,
        enclos: '',
      },
      {
        nom: obj.enclos.nom,
        _id: '',
        espece: '',
        naissance: '',
        deces: '',
        sexe: '',
        observations: '',
        position: '',
        enclos: '',
      },
      obj.observations,
      obj.date
    );
  }

  speciesAction(obj: IActionData) {}

  animalAction(obj: IActionData) {}
}
