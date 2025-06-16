import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing-module';
import { AdminDashboard } from './admin-dashboard/admin-dashboard';
import { SharedModule } from '../../shared/shared-module';
import { UserManagement } from './user-management/user-management';
import { RoleManagement } from './role-management/role-management';
import { SystemSettings } from './system-settings/system-settings';
import { AuditLogs } from './audit-logs/audit-logs';


@NgModule({
  declarations: [
    AdminDashboard,
    UserManagement,
    RoleManagement,
    SystemSettings,
    AuditLogs
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    SharedModule
  ]
})
export class AdminModule { }
