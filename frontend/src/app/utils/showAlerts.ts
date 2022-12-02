import { Injectable } from '@angular/core';

@Injectable()
export class ShowAlerts {
  constructor() {}

  public showAlert(element: string) {
    document.querySelector(element)?.classList.remove('d-none');
    setTimeout(() => {
      document.querySelector(element)?.classList.add('d-none');
    }, 2000);
  }
}
