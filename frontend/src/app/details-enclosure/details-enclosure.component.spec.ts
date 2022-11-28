import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailsEnclosureComponent } from './details-enclosure.component';

describe('DetailsEnclosureComponent', () => {
  let component: DetailsEnclosureComponent;
  let fixture: ComponentFixture<DetailsEnclosureComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetailsEnclosureComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetailsEnclosureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
