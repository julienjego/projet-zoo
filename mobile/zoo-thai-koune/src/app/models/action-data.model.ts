import { Enclosure } from 'src/app/models/enclosure.model';
import { Species } from 'src/app/models/species.model';
import { Animal } from 'src/app/models/animal.model';
export interface IActionData {
  enclos: Enclosure;
  espece: Species;
  animal: Animal;
  date: string;
  observations: string;
}
