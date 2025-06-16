// src/app/core/models/api-response.interface.ts

/**
 * @description
 * Generic interface defining a standardized structure for API responses.
 * @template T The type of the data payload contained in the response.
 */
export interface ApiResponse<T> {
  data: T | null;       // The main data payload from the API
  message: string;      // A message associated with the response (e.g., "Success", "User created")
  statusCode: number;   // HTTP status code (e.g., 200, 201, 400, 500)
  success: boolean;     // A boolean indicating if the operation was successful
  error?: string;       // Optional error message for unsuccessful responses
  // Add other common API response fields like pagination metadata, etc.
  pagination?: {
    totalItems: number;
    currentPage: number;
    itemsPerPage: number;
    totalPages: number;
  };
}