// src/app/core/interceptors/auth.interceptor.ts

import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service'; // Adjust path if your AuthService is elsewhere

@Injectable() // Interceptors are @Injectable() because they might have dependencies (like AuthService)
export class AuthInterceptor implements HttpInterceptor {

  constructor(private authService: AuthService) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const authToken = this.authService.getToken(); // Get the token from your AuthService

    // Clone the request to add the new header
    // Only add the token if it exists
    if (authToken) {
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${authToken}` // Add the token as a Bearer token
        }
      });
    }

    // Pass the (potentially modified) request to the next handler in the chain
    return next.handle(request);
  }
}