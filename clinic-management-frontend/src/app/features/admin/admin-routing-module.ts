import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminDashboard } from './admin-dashboard/admin-dashboard';
import { UserManagement } from './user-management/user-management';
import { RoleManagement } from './role-management/role-management';
import { SystemSettings } from './system-settings/system-settings';
import { AuditLogs } from './audit-logs/audit-logs';

const routes: Routes = [
  {
    path: '', // This means when you are at /admin
    component: AdminDashboard // Load AdminDashboardComponent
  },
  {
    path: 'users', // Route will be /admin/users
    component: UserManagement
  },
  {
    path: 'roles', // Route will be /admin/roles
    component: RoleManagement
  },
  {
    path: 'settings', // Route will be /admin/settings
    component: SystemSettings
  },
  {
    path: 'audit-logs', // Route will be /admin/audit-logs
    component: AuditLogs
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
