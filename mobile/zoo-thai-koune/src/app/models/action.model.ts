import { Enclosure } from './enclosure.model';
import { Animal } from './animal.model';
import { Species } from './species.model';
export class Action {
  _id: string;
  creation: string;
  enclos: Enclosure;
  espece: Species;
  animal: Animal;
  date: Date;
  observations: string;

  constructor(
    id: string,
    creation: string,
    enclos: Enclosure,
    espece: Species,
    animal: Animal,
    date: Date,
    observations: string
  ) {
    this._id = id;
    this.creation = creation;
    this.enclos = enclos;
    this.espece = espece;
    this.animal = animal;
    this.date = date;
    this.observations = observations;
  }
}
