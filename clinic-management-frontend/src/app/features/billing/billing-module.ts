import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '../../shared/shared-module';
import { BillingRoutingModule } from './billing-routing-module';
import { BillingDashboard } from './billing-dashboard/billing-dashboard';


@NgModule({
  declarations: [
    BillingDashboard
  ],
  imports: [
    CommonModule,
    BillingRoutingModule,
    SharedModule
  ]
})
export class BillingModule { }
