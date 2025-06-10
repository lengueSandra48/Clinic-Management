import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Layout } from './layout/layout';

// --- Placeholder Components for now ---
// You'll replace these with your actual feature components later
import { PlaceholderDashboard } from './placeholder-dashboard/placeholder-dashboard';
// (Make sure these placeholder components are declared in app.module.ts)

const routes: Routes = [
  {
    path: '', // This route will match the root path (e.g., 'yourdomain.com/')
    component: Layout, // The LayoutComponent is the main shell for these routes
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' }, // Redirect default to dashboard
      { path: 'dashboard', component: PlaceholderDashboard }, // Your dashboard view
      {
        path: 'patients', // <--- UPDATE THIS ROUTE TO LAZY-LOAD
        loadChildren: () => import('./features/patients/patients-module').then(m => m.PatientsModule)
      },
      {
        path: 'secretary', // <--- This is your new lazy-loaded route
        loadChildren: () => import('./features/secretary/secretary-module').then(m => m.SecretaryModule)
      },
      {
        path: 'doctor', // <--- NEW LAZY-LOADED ROUTE FOR DOCTOR
        loadChildren: () => import('./features/doctor/doctor-module').then(m => m.DoctorModule)
      },
      {
        path: 'appointment', // <-- ADDED APPOINTMENT ROUTE
        loadChildren: () => import('./features/appointment/appointment-module').then(m => m.AppointmentModule)
      },
      {
        path: 'billing', // <--- NEW LAZY-LOADED ROUTE FOR BILLING
        loadChildren: () => import('./features/billing/billing-module').then(m => m.BillingModule)
      }
    ]
  },

  // --- WILDCARD ROUTE (for 404 Not Found) ---
  // This route should always be the LAST one in your routes array.
  { path: '**', redirectTo: 'dashboard' } // For any unknown path, redirect to dashboard
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
