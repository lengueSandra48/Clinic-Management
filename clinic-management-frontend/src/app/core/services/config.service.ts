// src/app/core/services/config.service.ts

import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment'; // Assuming environment files exist

// Define an interface for your application configuration
export interface AppConfig {
  apiUrl: string;
  enableFeatureX: boolean;
  appVersion: string;
  // Add other global config properties
}

@Injectable({
  providedIn: 'root'
})
export class ConfigService {
  private appConfig: AppConfig;

  constructor() {
    // Load config from environment files or a separate config.json if needed
    this.appConfig = {
      apiUrl: environment.apiUrl,
      enableFeatureX: environment.production ? false : true, // Example: feature X enabled only in dev
      appVersion: '1.0.0', // Can be dynamically loaded from package.json or build process
      // ... other config values
    };
    console.log('ConfigService: Loaded configuration:', this.appConfig);
  }

  /**
   * Retrieves a specific configuration value.
   * @param key - The key of the configuration property.
   * @returns The value of the configuration property.
   */
  getConfig<K extends keyof AppConfig>(key: K): AppConfig[K] {
    return this.appConfig[key];
  }

  /**
   * Retrieves the entire application configuration object.
   * @returns The AppConfig object.
   */
  getAllConfig(): AppConfig {
    return { ...this.appConfig }; // Return a clone to prevent external modification
  }

  // You could also add methods to load configuration asynchronously from a backend API
  // or based on user roles, etc.
}