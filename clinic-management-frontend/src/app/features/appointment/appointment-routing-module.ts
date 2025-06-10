import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppointmentList } from './appointment-list/appointment-list';
// This module defines the routes for the Appointment feature.
// It includes a single route that maps the empty path to the AppointmentList component.
// This allows the AppointmentList component to be displayed when the user navigates to the appointment section of the application.

const routes: Routes = [
  {
    path: '', //  /appointment
    component: AppointmentList
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AppointmentRoutingModule { }