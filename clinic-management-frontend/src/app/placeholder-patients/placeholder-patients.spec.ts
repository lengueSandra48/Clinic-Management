import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlaceholderPatients } from './placeholder-patients';

describe('PlaceholderPatients', () => {
  let component: PlaceholderPatients;
  let fixture: ComponentFixture<PlaceholderPatients>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PlaceholderPatients]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PlaceholderPatients);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
