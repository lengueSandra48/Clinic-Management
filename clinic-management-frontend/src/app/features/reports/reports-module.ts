import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReportsRoutingModule } from './reports-routing-module';
import { ReportsDashboard } from './reports-dashboard/reports-dashboard';
import { SharedModule } from '../../shared/shared-module';


@NgModule({
  declarations: [
    ReportsDashboard
  ],
  imports: [
    CommonModule,
    ReportsRoutingModule,
    SharedModule
  ]
})
export class ReportsModule { }
