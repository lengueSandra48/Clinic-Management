import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppointmentList } from './appointment-list/appointment-list';
import { AppointmentCalendar } from './appointment-calendar/appointment-calendar'; 
import { AppointmentForm } from './appointment-form/appointment-form'; // Import new form component
import { AppointmentDetail } from './appointment-detail/appointment-detail'; // Import new detail component

const routes: Routes = [
 // You can choose which is the default view. Let's make calendar default for now.
  { path: '', redirectTo: 'calendar', pathMatch: 'full' },
  { path: 'calendar', component: AppointmentCalendar }, // New calendar route
  { path: 'list', component: AppointmentList }, // Existing list route
  
   { path: 'new', component: AppointmentForm }, // Route for adding a new appointment
  { path: ':id', component: AppointmentDetail }, // Route for viewing a specific appointment's details
  { path: ':id/edit', component: AppointmentForm } // Route for editing an existing appointment
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AppointmentRoutingModule { }