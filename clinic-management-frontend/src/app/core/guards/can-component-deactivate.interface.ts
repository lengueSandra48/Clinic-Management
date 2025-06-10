// src/app/core/guards/can-component-deactivate.interface.ts

import { Observable } from 'rxjs';

/**
 * @description
 * Interface that components with unsaved changes should implement.
 * The `unsavedChangesGuard` will call the `canDeactivate()` method
 * to check if navigation away from the component is allowed.
 */
export interface CanComponentDeactivate {
  /**
   * @description
   * Determines if the component can be deactivated (i.e., if navigation away is allowed).
   * Typically, this method checks for unsaved changes and prompts the user.
   * @returns {Observable<boolean> | Promise<boolean> | boolean} True if navigation is allowed, false otherwise.
   */
  canDeactivate(): Observable<boolean> | Promise<boolean> | boolean;
}