import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppointmentList } from './appointment-list/appointment-list';
import { AppointmentCalendar } from './appointment-calendar/appointment-calendar'; 
// This module defines the routes for the Appointment feature.
// It includes a single route that maps the empty path to the AppointmentList component.
// This allows the AppointmentList component to be displayed when the user navigates to the appointment section of the application.

const routes: Routes = [
 // You can choose which is the default view. Let's make calendar default for now.
  { path: '', redirectTo: 'calendar', pathMatch: 'full' },
  { path: 'calendar', component: AppointmentCalendar }, // New calendar route
  { path: 'list', component: AppointmentList }, // Existing list route
  // { path: 'new', component: AppointmentForm }, // If you create a dedicated form
  // { path: ':id', component: AppointmentDetail } // If you create a dedicated detail page
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AppointmentRoutingModule { }