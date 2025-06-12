import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../shared/shared-module';
import { SecretaryRoutingModule } from './secretary-routing-module';
import { SecretaryDashboard } from './secretary-dashboard/secretary-dashboard';


@NgModule({
  declarations: [
    SecretaryDashboard,
  ],
  imports: [
    CommonModule,
    SecretaryRoutingModule,
    SharedModule
  ]
})
export class SecretaryModule { }