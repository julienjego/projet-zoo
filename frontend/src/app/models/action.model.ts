import { Enclosure } from 'src/app/models/enclosure.model';
import { Species } from 'src/app/models/species.model';
import { Animal } from 'src/app/models/animal.model';
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
    animal: Animal, //
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
