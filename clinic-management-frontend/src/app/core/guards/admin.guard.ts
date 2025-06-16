// src/app/core/guards/admin.guard.ts

import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service'; // Adjust path if your AuthService is in a different subfolder

/**
 * @description
 * Route guard that checks if the authenticated user has the 'admin' role.
 * If the user is not an admin, they are redirected (e.g., to the dashboard or an unauthorized page).
 * This guard should typically be used *after* the `authGuard` on routes.
 */
export const adminGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  // Ensure user is logged in first, then check role
  if (authService.isLoggedIn() && authService.hasRole('admin')) {
    return true; // User is logged in and is an admin, allow access
  } else {
    console.warn('Access denied: User does not have administrator privileges.');
    // You can redirect to a more specific 'unauthorized' page or dashboard
    router.navigate(['/dashboard']); // Redirect to a default authorized page
    return false; // Prevent access
  }
};