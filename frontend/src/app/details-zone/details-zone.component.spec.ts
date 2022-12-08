import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailsZoneComponent } from './details-zone.component';

describe('DetailsZoneComponent', () => {
  let component: DetailsZoneComponent;
  let fixture: ComponentFixture<DetailsZoneComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetailsZoneComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetailsZoneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
