export class Event {
  creation: string;
  date: Date;
  enclos: string;
  espece: string;
  animal: string;
  type: string;
  observations: string;

  constructor(
    creation: string,
    date: Date,
    enclos: string,
    espece: string,
    animal: string,
    type: string,
    observations: string
  ) {
    this.creation = creation;
    this.date = date;
    this.enclos = enclos;
    this.espece = espece;
    this.animal = animal;
    this.type = type;
    this.observations = observations;
  }
}
