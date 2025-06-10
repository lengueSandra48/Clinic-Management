// src/app/core/services/notification.service.ts

import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';
// @ts-ignore: NotificationType is used via Notification interface but not directly.
import { Notification, NotificationType } from '../models/notification.interface'; // Updated import path!

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  private notificationSubject = new Subject<Notification>();
  notification$: Observable<Notification> = this.notificationSubject.asObservable();

  constructor() { }

  success(message: string, duration?: number): void {
    this.notificationSubject.next({ message, type: 'success', duration });
  }

  error(message: string, duration?: number): void {
    this.notificationSubject.next({ message, type: 'error', duration });
  }

  warning(message: string, duration?: number): void {
    this.notificationSubject.next({ message, type: 'warning', duration });
  }

  info(message: string, duration?: number): void {
    this.notificationSubject.next({ message, type: 'info', duration });
  }
}
