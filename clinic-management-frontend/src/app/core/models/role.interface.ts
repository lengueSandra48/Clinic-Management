// src/app/core/models/role.interface.ts

/**
 * @description
 * Interface defining the structure of a user role.
 */
export interface Role {
  id: string;
  name: string; // e.g., 'admin', 'doctor', 'patient'
  description?: string;
  permissions?: string[]; // Array of permissions associated with this role
}