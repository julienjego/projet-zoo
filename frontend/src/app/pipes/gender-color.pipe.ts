import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'genderColor',
})
export class GenderColorPipe implements PipeTransform {
  transform(gender: string): string {
    let color: string;

    switch (gender) {
      case 'M':
        color = 'success';
        break;
      case 'F':
        color = 'warning';
        break;
      default:
        color = 'secondary';
        break;
    }

    return 'badge rounded-pill text-bg-' + color;
  }
}
