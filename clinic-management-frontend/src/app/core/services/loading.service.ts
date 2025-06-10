// src/app/core/services/loading.service.ts

import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { distinctUntilChanged } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class LoadingService {
  private _loading = new BehaviorSubject<boolean>(false);

  /**
   * Observable that emits true when loading starts and false when it ends.
   * Uses distinctUntilChanged to only emit when the state actually changes.
   */
  public readonly isLoading$: Observable<boolean> = this._loading.asObservable().pipe(
    distinctUntilChanged()
  );

  private activeRequests = 0; // Keep track of active HTTP requests

  constructor() { }

  /**
   * Called by an interceptor when an HTTP request starts.
   */
  requestStarted(): void {
    this.activeRequests++;
    this._loading.next(true);
    console.log('LoadingService: Request started. Active requests:', this.activeRequests);
  }

  /**
   * Called by an interceptor when an HTTP request ends (success or error).
   */
  requestEnded(): void {
    this.activeRequests--;
    if (this.activeRequests <= 0) {
      this._loading.next(false);
      this.activeRequests = 0; // Ensure it doesn't go below zero
      console.log('LoadingService: All requests ended.');
    } else {
      console.log('LoadingService: Request ended. Active requests:', this.activeRequests);
    }
  }
}