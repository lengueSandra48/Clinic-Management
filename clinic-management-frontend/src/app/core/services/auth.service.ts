import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs'; // Keep 'of' to return Observables

/**
 * @description TEMPORARY / FROZEN Mock authentication service.
 * All complex logic has been removed to allow the application to compile.
 * This service needs to be revisited and debugged.
 */
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  // --- Observables (Simplifed to always return static values or empty arrays) ---
  public isLoggedIn$ = of(false); // Always return false for now
  public currentUserPermissions$ = of([]); // Always return empty array for now
  public currentUserRoles$ = of([]); // Always return empty array for now

  constructor() {
    // No initialization logic needed for the frozen state
  }

  // --- Core Authentication Methods (Simplified) ---

  /**
   * @description Simulates a user login. Always returns true for compilation.
   * @param username (Ignored in frozen state)
   * @param password (Ignored in frozen state)
   * @returns An observable that immediately emits `true`.
   */
  login(username: string, password: string): Observable<boolean> {
    console.log('AuthService (FROZEN): login called. Always returning success.');
    return of(true); // Always return true for compilation
  }

  /**
   * @description Checks if the user is currently logged in. Always returns `false`.
   * @returns `false`
   */
  isLoggedIn(): boolean {
    return false; // Always return false for compilation
  }

  /**
   * @description Returns the authentication token. Always returns `null`.
   * @returns `null`
   */
  getToken(): string | null {
    return null; // Always return null for compilation
  }

  /**
   * @description Checks if the current user has a specific permission. Always returns `false`.
   * @param requiredPermissions (Ignored in frozen state)
   * @returns `false`
   */
  hasPermission(requiredPermissions: string | string[]): boolean {
    return false; // Always return false for compilation
  }

  /**
   * @description Checks if the current user has a specific role. Always returns `false`.
   * @param requiredRoles (Ignored in frozen state)
   * @returns `false`
   */
  hasRole(requiredRoles: string | string[]): boolean {
    return false; // Always return false for compilation
  }

  /**
   * @description Logs out the current user. Does nothing in frozen state.
   */
  logout(): void {
    console.log('AuthService (FROZEN): logout called. Doing nothing.');
    // No actual logout logic needed for the frozen state
  }

  // --- Example methods to simulate permission/role changes for testing ---
  // (Removed for frozen state to prevent compile errors related to internal logic)
  // simulateAdminLogin(): void { }
  // simulateNurseLogin(): void { }
  // simulateReceptionistLogin(): void { }

  // --- Snapshot methods (Simplified) ---
  getCurrentUserRolesSnapshot(): string[] {
    return [];
  }

  getCurrentUserPermissionsSnapshot(): string[] {
    return [];
  }
}