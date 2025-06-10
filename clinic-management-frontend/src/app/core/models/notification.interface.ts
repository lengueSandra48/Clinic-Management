// src/app/core/models/notification.interface.ts

import { NotificationType } from './notification-type.type';

/**
 * @description
 * Interface defining the structure of a global application notification.
 */
export interface Notification {
  message: string;
  type: NotificationType;
  duration?: number; // Optional duration in milliseconds for transient notifications
}