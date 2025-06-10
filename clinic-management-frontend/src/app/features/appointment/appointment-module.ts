import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AppointmentRoutingModule } from './appointment-routing-module';
import { AppointmentList } from './appointment-list/appointment-list';
import { SharedModule } from '../../shared/shared-module';


@NgModule({
  declarations: [
    AppointmentList
  ],
  imports: [
    CommonModule,
    AppointmentRoutingModule,
    SharedModule
  ]
})
export class AppointmentModule { }
