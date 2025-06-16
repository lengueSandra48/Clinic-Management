// src/app/core/interceptors/header.interceptor.ts

import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class HeaderInterceptor implements HttpInterceptor {

  constructor() {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // Clone the request and set common headers
    // Example: Set Content-Type for all POST/PUT requests if not already set
    // Example: Set Accept-Language header
    request = request.clone({
      setHeaders: {
        'Content-Type': 'application/json', // Default for most REST APIs
        'Accept-Language': 'en-US,en;q=0.9', // Example: Request English language
        // Add any other global headers here
      }
    });

    // If you need to handle specific headers for specific requests (e.g., file uploads)
    // you might add conditional logic here or create separate interceptors.
    // For example, if it's a FormData request, you usually should NOT set Content-Type
    if (request.body instanceof FormData) {
      request = request.clone({
        headers: request.headers.delete('Content-Type') // Let the browser set Content-Type for FormData
      });
    }

    // Pass the modified request to the next handler
    return next.handle(request);
  }
}