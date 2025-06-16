// src/app/features/dashboard/dashboard.module.ts

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../shared/shared-module'; // Assuming SharedModule is imported
import { DashboardRoutingModule } from './dashboard-routing-module'; // <--- UPDATED path

import { Dashboard } from './dashboard'; // <--- UPDATED import and component name

@NgModule({
  declarations: [
    Dashboard 
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule, 
    SharedModule
  ],
  exports: [ 
    Dashboard
  ]
})
export class DashboardModule { } 