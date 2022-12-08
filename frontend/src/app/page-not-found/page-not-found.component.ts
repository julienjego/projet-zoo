import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-page-not-found',
  template: `
    <div class="container">
      <div class="row mt-4">
        <div class="col-12 text-center">
          <img src="../assets/images/dodo.jpg" class="img-fluid mb-4" />
          <h1>Hey, cette page n'existe pas (ou plus) !</h1>
          <a routerLink="/dashboard" class="waves-effect waves-teal btn-flat">
            Retourner à l' accueil
          </a>
        </div>
      </div>
    </div>
  `,
  styles: [],
})
export class PageNotFoundComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
}
