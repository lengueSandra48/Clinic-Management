import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BillingDashboard } from './billing-dashboard';

describe('BillingDashboard', () => {
  let component: BillingDashboard;
  let fixture: ComponentFixture<BillingDashboard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BillingDashboard]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BillingDashboard);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
