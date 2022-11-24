import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'genderString',
})
export class GenderPipe implements PipeTransform {
  transform(gender: string): string {
    let s: string;

    switch (gender) {
      case 'M':
        s = 'Mâle';
        break;
      case 'F':
        s = 'Femelle';
        break;
      default:
        s = 'Inconnu';
        break;
    }

    return s;
  }
}
