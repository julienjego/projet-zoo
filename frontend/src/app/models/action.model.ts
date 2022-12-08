export class Action {
  _id: string;
  creation: string;
  enclos: string;
  espece: string;
  animal: string;
  date: Date;
  observations: string;

  constructor(
    id: string,
    creation: string,
    enclos: string,
    espece: string,
    animal: string,
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
