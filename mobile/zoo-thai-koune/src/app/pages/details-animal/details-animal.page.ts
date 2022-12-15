import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { AnimalService } from 'src/app/services/animal/animal.service';
import { Animal } from 'src/app/models/animal.model';
import { Action } from 'src/app/models/action.model';
import { Observable } from 'rxjs';
import { ActionService } from 'src/app/services/action/action.service';

@Component({
  selector: 'app-details-animal',
  templateUrl: './details-animal.page.html',
  styleUrls: ['./details-animal.page.scss'],
})
export class DetailsAnimalPage implements OnInit {
  animalId: string | null = this.route.snapshot.paramMap.get('id');
  animal: Animal | null | undefined;
  actions$: Observable<Action[] | null> | undefined;

  constructor(
    private route: ActivatedRoute,
    private animalService: AnimalService,
    private actionService: ActionService
  ) {}

  ngOnInit() {
    if (this.animalId) {
      this.animalService
        .getAnAnimal(this.animalId)
        .subscribe((animal) => (this.animal = animal));

      this.getActions(this.animalId);
    }
  }

  getActions(id: string) {
    this.actions$ = this.actionService.getActions(id, 'actions/animals');
  }

  deleteAction(id: string) {
    this.actionService.deleteAction(id);
  }

  goBack() {
    window.history.back();
  }
}
