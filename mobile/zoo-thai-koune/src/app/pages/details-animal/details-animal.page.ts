import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { AnimalService } from 'src/app/services/animal/animal.service';
import { Animal } from 'src/app/models/animal.model';
import { Action } from 'src/app/models/action.model';
import { Observable } from 'rxjs';
import { ActionService } from 'src/app/services/action/action.service';
import { Toasts } from 'src/app/utils/toasts';

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
    private actionService: ActionService,
    private toast: Toasts
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

  careAnimal(id: string) {
    this.animalService
      .careAnimal(id)
      .subscribe({ next: (response) => response, error: (error) => error });
  }

  moveAnimal(id: string, position: string) {
    this.animalService.moveAnimal(id, position).subscribe({
      next: (response: any) => {
        this.animal = response.animal;
        return response;
      },
      error: (error) => error,
    });
  }

  doAction(action: Action) {
    if (this.animal) {
      if (action.observations === 'Soigner') {
        this.careAnimal(this.animal._id);
      } else if (action.observations === 'Déplacer') {
        this.moveAnimal(this.animal._id, this.animal?.position);
      }
      this.actionService.deleteAction(action._id);
      this.toast.presentToast('Action effectuée !');
      this.getActions(this.animal._id);
    }
  }

  goBack() {
    window.history.back();
  }
}
