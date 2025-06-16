// src/app/core/interceptors/loading.interceptor.ts

import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { LoadingService } from '../services/loading.service'; // Our custom loading service

@Injectable()
export class LoadingInterceptor implements HttpInterceptor {

  constructor(private loadingService: LoadingService) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // Tell the loading service that a new request has started
    this.loadingService.requestStarted();

    // Pass the request to the next handler and, regardless of success or error,
    // tell the loading service that the request has ended.
    return next.handle(request).pipe(
      finalize(() => {
        this.loadingService.requestEnded();
      })
    );
  }
}