import { AnimalService } from 'src/app/services/animal/animal.service';
import { ActionService } from 'src/app/services/action/action.service';
import { IActionData } from './../models/action-data.model';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ActionCreator {
  constructor(
    private actionService: ActionService,
    private animalService: AnimalService
  ) {}

  createAction(obj: IActionData) {
    if (obj.enclos) {
      this.enclosureAction(obj);
    } else if (obj.espece) {
      this.speciesAction(obj);
    } else if (obj.animal) {
      this.animalAction(obj);
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

  speciesAction(obj: IActionData) {
    this.actionService.createAction(
      {
        nom: obj.espece.enclos,
        _id: '',
        nomApp: '',
        zone: '',
        coordonnees: '',
        superficie: 0,
      },
      obj.espece,
      {
        nom: obj.espece.nom,
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

  animalAction(obj: IActionData) {
    let enclosure: string;

    this.animalService
      .getEnclosureofAnimal(obj.animal._id)
      .subscribe((response) => {
        enclosure = response[0].enclosApp;
        this.actionService.createAction(
          {
            nom: enclosure,
            _id: '',
            nomApp: '',
            zone: '',
            coordonnees: '',
            superficie: 0,
          },
          {
            nom: obj.animal.espece,
            _id: '',
            nomApp: '',
            sociable: false,
            observations: '',
            dangereux: false,
            enclos: '',
          },
          obj.animal,
          obj.observations,
          obj.date
        );
      });
  }
}
