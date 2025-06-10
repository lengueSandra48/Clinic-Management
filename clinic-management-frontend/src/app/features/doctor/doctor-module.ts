import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DoctorRoutingModule } from './doctor-routing-module';
import { DoctorDashboard } from './doctor-dashboard/doctor-dashboard';
import { SharedModule } from '../../shared/shared-module';


@NgModule({
  declarations: [
    
  
    DoctorDashboard
  ],
  imports: [
    CommonModule,
    DoctorRoutingModule,
    SharedModule
  ]
})
export class DoctorModule { }
