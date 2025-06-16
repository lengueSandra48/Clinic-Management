import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PatientsList } from './patients-list/patients-list';
import { PatientForm } from './patient-form/patient-form'; // New
import { PatientDetail } from './patient-detail/patient-detail'; // New

const routes: Routes = [
  { path: '', component: PatientsList }, // Default for /patients
  { path: 'new', component: PatientForm }, // Route for /patients/new (add new patient)
  { path: 'edit/:id', component: PatientForm }, // Route for /patients/edit/:id (edit existing patient)
  { path: ':id', component: PatientDetail }, // Route for /patients/:id (view patient details)
];

@NgModule({
  imports: [RouterModule.forChild(routes)], // Use forChild() for feature modules
  exports: [RouterModule]
})
export class PatientsRoutingModule { }