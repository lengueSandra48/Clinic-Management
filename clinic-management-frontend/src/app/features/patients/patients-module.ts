import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SharedModule } from '../../shared/shared-module'; 

import { PatientsRoutingModule } from './patients-routing-module';
import { PatientsList } from './patients-list/patients-list';


@NgModule({
  declarations: [
    PatientsList
  ],
  imports: [
    CommonModule,
    FormsModule,
    PatientsRoutingModule,
    SharedModule  
  ]
})

export class PatientsModule { }
// This module imports necessary Angular modules and declares the PatientsList component.
// It also imports the PatientsRoutingModule to handle routing for this feature.
