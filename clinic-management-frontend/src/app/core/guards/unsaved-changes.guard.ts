// src/app/core/guards/unsaved-changes.guard.ts

import { CanDeactivateFn } from '@angular/router';
import { Observable } from 'rxjs';
import { CanComponentDeactivate } from './can-component-deactivate.interface';

/**
 * @description
 * Route guard that checks if a component has unsaved changes before allowing deactivation (navigation away).
 * The component must implement the `CanComponentDeactivate` interface.
 */
export const unsavedChangesGuard: CanDeactivateFn<CanComponentDeactivate> = (
  component: CanComponentDeactivate,
  currentRoute,
  currentState,
  nextState
) => {
  // Check if the component instance exists and implements the canDeactivate method
  if (component && typeof component.canDeactivate === 'function') {
    // Call the component's canDeactivate method
    const result = component.canDeactivate();

    // Handle different return types (Observable, Promise, or boolean)
    if (result instanceof Observable || result instanceof Promise) {
      return result; // Guard will wait for the Observable/Promise to resolve
    }
    return result; // Direct boolean return
  }

  // If the component doesn't implement canDeactivate, or if component is null/undefined,
  // assume no unsaved changes and allow navigation.
  return true;
};