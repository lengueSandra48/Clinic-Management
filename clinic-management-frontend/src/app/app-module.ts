import { NgModule, provideBrowserGlobalErrorListeners } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing-module';
import { App } from './app';


import { CoreModule } from './core/core-module';
import { SharedModule } from './shared/shared-module';
import { LayoutModule } from './layout/layout-module';

import { PlaceholderDashboard } from './placeholder-dashboard/placeholder-dashboard';
import { DoctorDashboard } from './features/doctor-dashboard/doctor-dashboard';

@NgModule({
  declarations: [
    App,
    PlaceholderDashboard,
    DoctorDashboard
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    CoreModule,
    SharedModule,
    LayoutModule
  ],
  providers: [
    provideBrowserGlobalErrorListeners()
  ],
  bootstrap: [App]
})
export class AppModule { }

//Placeholder Components



