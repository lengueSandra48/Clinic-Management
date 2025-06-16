import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared-module';
import { Layout } from './layout';
import { Header } from './header/header';
import { Sidebar } from './sidebar/sidebar';
import { Footer } from './footer/footer';



@NgModule({
  declarations: [
    Layout,
    Header,
    Sidebar,
    Footer
  ],
  imports: [
    CommonModule,
    RouterModule,
    SharedModule
  ],
  exports: [
    Layout // <--- IMPORTANT: Export LayoutComponent so it can be used in AppRoutingModule or AppComponent
  ]
})
export class LayoutModule { }
