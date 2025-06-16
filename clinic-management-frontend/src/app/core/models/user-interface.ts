// src/app/core/models/user.interface.ts

/**
 * @description
 * Interface defining the structure of a user object in the application.
 */
export interface User {
  id: string;
  username: string;
  email: string;
  roles: string[]; // Array of roles (e.g., 'admin', 'doctor', 'patient')
  firstName?: string;
  lastName?: string;
  // Add other user-specific properties as needed
}