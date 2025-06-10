import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BillingDashboard } from './billing-dashboard/billing-dashboard';

const routes: Routes = [
  {
    path: '', // This means when you are at /billing
    component: BillingDashboard // Load BillingDashboardComponent
  }
  // You would add more routes here later for specific billing sub-features, e.g.,
  // { path: 'invoices', component: InvoiceListComponent },
  // { path: 'payments', component: PaymentListComponent },
  // { path: 'new-invoice', component: InvoiceFormComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)], // Use forChild() for feature modules
  exports: [RouterModule]
})
export class BillingRoutingModule { }