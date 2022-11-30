import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListEnclosuresComponent } from './list-enclosures.component';

describe('ListEnclosuresComponent', () => {
  let component: ListEnclosuresComponent;
  let fixture: ComponentFixture<ListEnclosuresComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListEnclosuresComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListEnclosuresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
