import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PrescriptionList } from './prescription-list/prescription-list';

const routes: Routes = [
  {
    path: '', // This means when you are at /prescription
    component: PrescriptionList // Load PrescriptionList component
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PrescriptionRoutingModule { }
