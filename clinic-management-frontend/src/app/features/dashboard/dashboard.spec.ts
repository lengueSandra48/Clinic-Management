import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlaceholderDashboard } from './placeholder-dashboard';

describe('PlaceholderDashboard', () => {
  let component: PlaceholderDashboard;
  let fixture: ComponentFixture<PlaceholderDashboard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PlaceholderDashboard]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PlaceholderDashboard);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
