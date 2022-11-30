import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'speciesSociable',
})
export class SpeciesSociablePipe implements PipeTransform {
  transform(sociable: boolean): string {
    let color: string;

    switch (sociable) {
      case true:
        color = 'success';
        break;
      case false:
        color = 'danger';
        break;
      default:
        color = 'secondary';
        break;
    }

    return 'badge rounded-pill text-bg-' + color;
  }
}
