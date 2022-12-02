export class Employee {
  nom: string;
  prenom: string;
  secu: string;
  naissance: string;
  role: string;
  username: string;

  constructor(
    nom: string,
    prenom: string,
    secu: string,
    naissance: string,
    role: string,
    username: string
  ) {
    this.nom = nom;
    this.prenom = prenom;
    this.secu = secu;
    this.naissance = naissance;
    this.role = role;
    this.username = username;
  }
}
