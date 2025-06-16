import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DoctorDashboard } from './doctor-dashboard/doctor-dashboard'; // Import your new component

const routes: Routes = [
  {
    path: '', // This means when you are at /doctor
    component: DoctorDashboard // Load DoctorDashboardComponent
  }
  // You would add more routes here later for doctor-specific sub-features, e.g.,
  // { path: 'appointments', component: DoctorAppointmentsComponent },
  // { path: 'patients/:id', component: DoctorPatientDetailComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)], // Use forChild() for feature modules
  exports: [RouterModule]
})
export class DoctorRoutingModule { }