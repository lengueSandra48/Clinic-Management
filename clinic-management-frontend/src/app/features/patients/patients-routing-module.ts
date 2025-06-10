import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PatientsList } from './patients-list/patients-list';

const routes: Routes = [
  {
    path: '', // This means when you are at /patients
    component: PatientsList // Load PatientsListComponent
  }
  // You would add more routes here later for specific patient actions, e.g.,
  // { path: 'new', component: PatientFormComponent },
  // { path: ':id', component: PatientDetailComponent }, // Patient detail page by ID
  // { path: ':id/edit', component: PatientEditComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)], // Use forChild() for feature modules
  exports: [RouterModule]
})
export class PatientsRoutingModule { }