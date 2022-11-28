export class Enclosure {
  _id: string;
  nom: string;
  nomApp: string;
  zone: string;
  coordonnees: string;
  superficie: number;

  constructor(
    id: string,
    nom: string,
    nomApp: string,
    zone: string,
    coordonnees: string,
    superficie: number
  ) {
    this._id = id;
    this.nom = nom;
    this.nomApp = nomApp;
    this.zone = zone;
    this.coordonnees = coordonnees;
    this.superficie = superficie;
  }
}
