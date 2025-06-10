
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SecretaryDashboard } from './secretary-dashboard/secretary-dashboard'; // Import your new component

const routes: Routes = [
  {
    path: '', // This means when you are at /secretary
    component: SecretaryDashboard // Load SecretaryDashboardComponent
  }
  // You would add more routes here later, e.g.,
  // { path: 'appointments', component: SecretaryAppointmentsComponent },
  // { path: 'bills', component: SecretaryBillingComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)], // Use forChild() for feature modules
  exports: [RouterModule]
})
export class SecretaryRoutingModule { }