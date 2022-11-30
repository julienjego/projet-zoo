import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'speciesSociableString',
})
export class SpeciesSociableStringPipe implements PipeTransform {
  transform(sociable: boolean): string {
    let s: string;

    switch (sociable) {
      case true:
        s = 'Oui';
        break;
      case false:
        s = 'Non';
        break;
      default:
        s = 'Inconnu';
        break;
    }

    return s;
  }
}
