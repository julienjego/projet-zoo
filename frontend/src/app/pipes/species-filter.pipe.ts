import { Pipe, PipeTransform } from '@angular/core';
import { Animal } from '../models/animal.model';

@Pipe({
  name: 'speciesFilter',
})
export class SpeciesFilterPipe implements PipeTransform {
  transform(list: Animal[] | null, value: string) {
    if (list) {
      return value ? list.filter((item) => item.espece === value) : list;
    } else {
      return null;
    }
  }
}
