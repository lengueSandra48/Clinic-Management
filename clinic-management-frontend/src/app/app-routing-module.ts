import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Layout } from './layout/layout';


const routes: Routes = [
  {
    path: '', // This route will match the root path (e.g., 'yourdomain.com/')
    component: Layout, // The LayoutComponent is the main shell for these routes
    children: [
      {
    path: 'auth', // This will be the base path for login, register, etc.
    loadChildren: () => import('./auth/auth-module').then(m => m.AuthModule)
      },

      //{ path: '**', redirectTo: 'auth/login' },
    { path: '', redirectTo: '/dashboard', pathMatch: 'full' }, // Redirect root to dashboard
    {
    path: 'dashboard',
    // <--- UPDATED lazy load path for dashboard module
    loadChildren: () => import('./features/dashboard/dashboard.module')
      .then(m => m.DashboardModule)
    },
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
    path: 'chat', // <--- New route for chat
    loadChildren: () => import('./features/chat/chat-module')
      .then(m => m.ChatModule)
  },
      {
        path: 'billing', // <--- NEW LAZY-LOADED ROUTE FOR BILLING
        loadChildren: () => import('./features/billing/billing-module').then(m => m.BillingModule)
      },
      {
        path: 'prescription', // <--- NEW LAZY-LOADED ROUTE FOR PRESCRIPTION
        loadChildren: () => import('./features/prescription/prescription-module').then(m => m.PrescriptionModule)
      },
      {
        path: 'reports', // <--- NEW LAZY-LOADED ROUTE FOR REPORTS
        loadChildren: () => import('./features/reports/reports-module').then(m => m.ReportsModule)
      },
      {
        path: 'admin', // <--- NEW LAZY-LOADED ROUTE FOR ADMIN
        loadChildren: () => import('./features/admin/admin-module').then(m => m.AdminModule)
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
