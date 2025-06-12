import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'; // <--- Import FormsModule for ngModel
import { SharedModule } from '../../shared/shared-module'; // Ensure it's imported


// FullCalendar Imports
import { FullCalendarModule } from '@fullcalendar/angular';
import { AppointmentList } from './appointment-list/appointment-list';
import { AppointmentCalendar } from './appointment-calendar/appointment-calendar'; // <--- New Component

import { AppointmentRoutingModule } from './appointment-routing-module';
import { AppointmentForm } from './appointment-form/appointment-form';
import { AppointmentDetail } from './appointment-detail/appointment-detail';

@NgModule({
  declarations: [
    AppointmentList,
    AppointmentCalendar,
    AppointmentForm,
    AppointmentDetail // <--- Declare the new component
  ],
  imports: [
    CommonModule,
    AppointmentRoutingModule,
    FormsModule,
    ReactiveFormsModule, // <--- Import ReactiveFormsModule for reactive forms
    SharedModule,
    FullCalendarModule
  ]
})
export class AppointmentModule { }