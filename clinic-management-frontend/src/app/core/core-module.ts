// src/app/core/core.module.ts

import { NgModule, Optional, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common'; // Typically needed for directives like ngIf, ngFor
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http'; // For HTTP client and interceptors

// Import your core services, guards, and interceptors here
import { AuthService } from './services/auth.service';
import { NotificationService } from './services/notification.service';
import { AuthInterceptor } from './interceptors/auth.interceptor'; // Assuming you create this file later
import { ErrorInterceptor } from './interceptors/error.interceptor'; // Assuming you create this file later

@NgModule({
  // Components, directives, pipes that belong ONLY to this CoreModule.
  // CoreModule typically does NOT declare UI components.
  // If you had any core directives/pipes not related to UI that should be singleton, they'd go here.
  declarations: [],

  // Modules whose components/directives/pipes are used by components declared in this CoreModule.
  // CommonModule is almost always included. HttpClientModule if core services make HTTP calls.
  imports: [
    CommonModule,
    HttpClientModule
  ],

  // Services, Guards, Interceptors that should be singletons across the entire application.
  // Using `providedIn: 'root'` in services is often preferred now, but explicitly listing here
  // ensures they are provided by the CoreModule's injector.
  providers: [
    AuthService,
    NotificationService,
    // Provide HTTP Interceptors here, ensuring they are singletons
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    // Guards are often defined as functional guards and directly used in routing configs,
    // so they are not usually listed in the 'providers' array of a module unless they are class-based.
    // If you had class-based guards, they'd be listed here.
  ]
})
export class CoreModule {
  // This constructor prevents CoreModule from being accidentally imported by lazy-loaded feature modules.
  // If a lazy-loaded module imports CoreModule, it creates a new instance of its services, breaking singleton pattern.
  // This check ensures CoreModule is imported only once, by the AppModule.
  constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
    if (parentModule) {
      throw new Error(
        'CoreModule is already loaded. Import it in the AppModule only.'
      );
    }
  }
}