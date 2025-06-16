import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PrescriptionRoutingModule } from './prescription-routing-module';
import { PrescriptionList } from './prescription-list/prescription-list';
import { SharedModule } from '../../shared/shared-module';


@NgModule({
  declarations: [
    PrescriptionList
  ],
  imports: [
    CommonModule,
    PrescriptionRoutingModule,
    SharedModule
  ]
})
export class PrescriptionModule { }
