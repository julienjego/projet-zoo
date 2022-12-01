export class Species {
  _id: string;
  nom: string;
  nomApp: string;
  sociable: boolean;
  observations: string;
  dangereux: boolean;
  enclos: string;

  constructor(
    id: string,
    nom: string,
    nomApp: string,
    sociable: boolean,
    observations: string,
    dangereux: boolean,
    enclos: string
  ) {
    this._id = id;
    this.nom = nom;
    this.nomApp = nomApp;
    this.sociable = sociable;
    this.observations = observations;
    this.dangereux = dangereux;
    this.enclos = enclos;
  }
}
