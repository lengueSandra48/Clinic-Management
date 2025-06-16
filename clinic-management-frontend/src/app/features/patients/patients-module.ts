import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SharedModule } from '../../shared/shared-module'; 
import { ReactiveFormsModule } from '@angular/forms';

import { PatientsRoutingModule } from './patients-routing-module';
import { PatientsList } from './patients-list/patients-list';
import { PatientForm } from './patient-form/patient-form';
import { PatientDetail } from './patient-detail/patient-detail';


@NgModule({
  declarations: [
    PatientsList,
    PatientForm,
    PatientDetail
  ],
  imports: [
    CommonModule,
    FormsModule,
    PatientsRoutingModule,
    SharedModule,
    ReactiveFormsModule // Import ReactiveFormsModule for reactive forms support 
  ]
})

export class PatientsModule { }
// This module imports necessary Angular modules and declares the PatientsList component.
// It also imports the PatientsRoutingModule to handle routing for this feature.
