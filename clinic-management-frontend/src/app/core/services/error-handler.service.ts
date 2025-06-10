// src/app/core/services/error-handler.service.ts

import { Injectable, ErrorHandler, Injector } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { NotificationService } from './notification.service'; // Use our NotificationService
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class ErrorHandlerService implements ErrorHandler {
  // Use Injector to avoid circular dependency with NotificationService
  // ErrorHandler gets instantiated very early, so injecting NotificationService directly
  // might cause issues if NotificationService itself has dependencies.
  constructor(private injector: Injector) { }

  handleError(error: any): void {
    const notifier = this.injector.get(NotificationService);
    const router = this.injector.get(Router);

    let errorMessage = 'An unexpected error occurred.';
    let displayToUser = true; // Flag to decide if we show to user

    if (error instanceof HttpErrorResponse) {
      // Server-side or network error
      if (error.error instanceof ErrorEvent) {
        // A client-side or network error occurred.
        console.error('Client-side error:', error.error.message);
        errorMessage = `Network or client error: ${error.error.message}`;
      } else {
        // The backend returned an unsuccessful response code.
        // The response body may contain clues as to what went wrong.
        console.error(
          `Backend returned code ${error.status}, ` +
          `body was: ${JSON.stringify(error.error)}`);

        if (error.status === 0) {
          errorMessage = 'Cannot connect to the server. Please check your internet connection or try again later.';
        } else if (error.status === 401) {
          errorMessage = 'Unauthorized access. Please log in again.';
          // Optionally redirect to login
          router.navigate(['/auth/login']);
        } else if (error.status === 403) {
          errorMessage = 'You do not have permission to perform this action.';
        } else if (error.status === 404) {
          errorMessage = 'The requested resource was not found.';
        } else if (error.status >= 500) {
          errorMessage = 'Server error. Please try again later.';
        } else if (error.error && typeof error.error === 'string') {
          // If the backend returns a plain string error message
          errorMessage = error.error;
        } else if (error.error && typeof error.error === 'object' && error.error.message) {
          // If the backend returns an object with a message property
          errorMessage = error.error.message;
        }
      }
    } else if (error instanceof Error) {
      // A generic JavaScript error
      console.error('Application error:', error.message);
      errorMessage = error.message || 'An application error occurred.';
    } else {
      // Other types of errors
      console.error('Unknown error:', error);
      errorMessage = 'An unknown error occurred.';
    }

    if (displayToUser) {
      notifier.error(errorMessage, 5000); // Display error for 5 seconds
    }
    // You can also send the error to a remote logging service (e.g., Sentry, Bugsnag)
    // console.error('Sending error to remote logging service:', error);

    // IMPORTANT: Re-throw the error if you want Angular's default error handling to still occur
    // For example, if you want it to show in the browser's console even after handling.
    // However, if you fully handle it here and don't want Angular's default console spam, you can omit throw.
    // throw error;
  }
}