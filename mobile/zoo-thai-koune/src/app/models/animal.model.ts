export class Animal {
  _id: string;
  nom: string;
  espece: string;
  naissance: string;
  deces: string;
  sexe: string;
  observations: string;
  position: string;
  enclos: string;

  constructor(
    id: string,
    nom: string,
    espece: string,
    naissance: string,
    deces: string,
    sexe: string,
    observations: string,
    position: string,
    enclos: string
  ) {
    this._id = id;
    this.nom = nom;
    this.espece = espece;
    this.naissance = naissance;
    this.deces = deces;
    this.sexe = sexe;
    this.observations = observations;
    this.position = position;
    this.enclos = enclos;
  }
}
