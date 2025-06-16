// src/app/core/guards/auth.guard.ts

import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service'; // Adjust path if your AuthService is in a different subfolder

/**
 * @description
 * Route guard that checks if a user is authenticated (logged in).
 * If the user is not logged in, they are redirected to the login page.
 */

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  if (authService.isLoggedIn()) {
    return true; // User is logged in, allow access
  } else {
    console.warn('Access denied: User is not authenticated. Redirecting to login.');
    router.navigate(['/auth/login'], { queryParams: { returnUrl: state.url } }); // Redirect to login, pass original URL
    return false; // Prevent access
  }
};