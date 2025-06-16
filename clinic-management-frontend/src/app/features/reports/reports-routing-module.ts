import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ReportsDashboard } from './reports-dashboard/reports-dashboard'; // Import your new component

const routes: Routes = [
  {
    path: '', // This means when you are at /reports
    component: ReportsDashboard // Load ReportsDashboardComponent
  }
  // You would add more routes here later for specific reports, e.g.,
  // { path: 'patient-statistics', component: PatientStatsComponent },
  // { path: 'financial-summary', component: FinancialSummaryComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReportsRoutingModule { }
