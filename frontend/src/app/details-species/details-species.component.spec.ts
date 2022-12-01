import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailsSpeciesComponent } from './details-species.component';

describe('DetailsSpeciesComponent', () => {
  let component: DetailsSpeciesComponent;
  let fixture: ComponentFixture<DetailsSpeciesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetailsSpeciesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetailsSpeciesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
