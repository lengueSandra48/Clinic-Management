import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; // <--- Import FormsModule for ngModel
import { SharedModule } from '../../shared/shared-module'; // Ensure it's imported

// FullCalendar Imports
import { FullCalendarModule } from '@fullcalendar/angular';
import { AppointmentList } from './appointment-list/appointment-list';
import { AppointmentCalendar } from './appointment-calendar/appointment-calendar'; // <--- New Component

import { AppointmentRoutingModule } from './appointment-routing-module';

@NgModule({
  declarations: [
    AppointmentList,
    AppointmentCalendar // <--- Declare the new component
  ],
  imports: [
    CommonModule,
    AppointmentRoutingModule,
    FormsModule, // <--- Add FormsModule
    SharedModule,
    FullCalendarModule // <--- Add FullCalendarModule
  ]
})
export class AppointmentModule { }