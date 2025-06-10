// src/app/core/models/base-entity.interface.ts

/**
 * @description
 * Interface defining common properties for all data entities in the application.
 */
export interface BaseEntity {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  // Add other common properties like `createdBy`, `lastModifiedBy`, `isActive`, etc.
}