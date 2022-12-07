export class Action {
  creation: string;
  enclos: string;
  espece: string;
  animal: string;
  date: Date;
  observations: string;

  constructor(
    creation: string,
    enclos: string,
    espece: string,
    animal: string,
    date: Date,
    observations: string
  ) {
    this.creation = creation;
    this.enclos = enclos;
    this.espece = espece;
    this.animal = animal;
    this.date = date;
    this.observations = observations;
  }
}
