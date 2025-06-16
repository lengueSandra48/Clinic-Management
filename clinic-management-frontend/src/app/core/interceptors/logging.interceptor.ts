// src/app/core/interceptors/logging.interceptor.ts

import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpResponse,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable()
export class LoggingInterceptor implements HttpInterceptor {

  constructor() {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const started = Date.now();
    let ok: string;

    // Log the outgoing request
    console.groupCollapsed(`HTTP Request: ${request.method} ${request.url}`);
    console.log('Method:', request.method);
    console.log('URL:', request.url);
    console.log('Headers:', request.headers.keys().map(key => `${key}: ${request.headers.get(key)}`).join(', '));
    if (request.body) {
      console.log('Body:', request.body);
    }
    console.groupEnd();

    return next.handle(request).pipe(
      tap({
        // Log the response
        next: (event: HttpEvent<any>) => {
          if (event instanceof HttpResponse) {
            ok = 'Success';
            const elapsed = Date.now() - started;
            console.groupCollapsed(`HTTP Response: ${ok} ${request.method} ${request.url} (${elapsed}ms)`);
            console.log('Status:', event.status, event.statusText);
            console.log('Response Body:', event.body);
            console.groupEnd();
          }
        },
        // Log errors
        error: (error: HttpErrorResponse) => {
          ok = 'Failed';
          const elapsed = Date.now() - started;
          console.groupCollapsed(`HTTP Response: ${ok} ${request.method} ${request.url} (${elapsed}ms)`);
          console.error('Error Status:', error.status, error.statusText);
          console.error('Error Body:', error.error);
          console.groupEnd();
        }
      })
    );
  }
}