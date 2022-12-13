export class Zone {
  _id: number;
  nom: string;
  nomApp: string;

  constructor(id: number, nom: string, nomApp: string) {
    this._id = id;
    this.nom = nom;
    this.nomApp = nomApp;
  }
}
