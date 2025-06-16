import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportsDashboard } from './reports-dashboard';

describe('ReportsDashboard', () => {
  let component: ReportsDashboard;
  let fixture: ComponentFixture<ReportsDashboard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ReportsDashboard]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReportsDashboard);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
