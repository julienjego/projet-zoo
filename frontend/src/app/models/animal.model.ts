export class Animal {
  nom: string;
  espece: string;
  naissance: string;
  deces: string;
  sexe: string;
  observations: string;
  position: string;

  constructor(
    nom: string,
    espece: string,
    naissance: string,
    deces: string,
    sexe: string,
    observations: string,
    position: string
  ) {
    this.nom = nom;
    this.espece = espece;
    this.naissance = naissance;
    this.deces = deces;
    this.sexe = sexe;
    this.observations = observations;
    this.position = position;
  }
}
