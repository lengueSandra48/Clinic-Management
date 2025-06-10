// src/app/core/interceptors/error.interceptor.ts

import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { NotificationService } from '../services/notification.service'; // Your notification service
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service'; // For logout on 401

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

  constructor(
    private notificationService: NotificationService,
    private router: Router,
    private authService: AuthService
  ) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
        let errorMessage = 'An unknown error occurred during the request.';
        let shouldLogout = false;

        if (error.error instanceof ErrorEvent) {
          // A client-side or network error occurred.
          errorMessage = `Network Error: ${error.error.message}`;
          console.error('Client-side error:', error.error.message);
        } else {
          // The backend returned an unsuccessful response code.
          // The response body may contain clues as to what went wrong.
          console.error(
            `Backend returned code ${error.status}, ` +
            `body was: ${JSON.stringify(error.error)}`
          );

          switch (error.status) {
            case 0:
              errorMessage = 'Cannot connect to the server. Please check your internet connection.';
              break;
            case 400: // Bad Request
              errorMessage = error.error?.message || error.error?.error || 'Bad Request. Please check your input.';
              break;
            case 401: // Unauthorized
              errorMessage = 'Your session has expired or you are unauthorized. Please log in again.';
              shouldLogout = true; // Flag to trigger logout
              break;
            case 403: // Forbidden
              errorMessage = 'You do not have permission to access this resource.';
              break;
            case 404: // Not Found
              errorMessage = 'The requested resource was not found.';
              break;
            case 500: // Internal Server Error
              errorMessage = 'A server error occurred. Please try again later.';
              break;
            default:
              errorMessage = error.error?.message || error.message || `Error ${error.status}: ${error.statusText}`;
              break;
          }
        }

        // Display error message to the user
        this.notificationService.error(errorMessage, 5000); // Show for 5 seconds

        // Handle specific actions like logout for 401
        if (shouldLogout) {
          this.authService.logout(); // Use AuthService to handle logout
          // router.navigate(['/auth/login']); // AuthService.logout() handles this
        }

        // Re-throw the error to be caught by the calling service/component if needed
        return throwError(() => error);
      })
    );
  }
}