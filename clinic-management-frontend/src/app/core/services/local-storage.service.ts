// src/app/core/services/local-storage.service.ts

import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  constructor() { }

  /**
   * Sets a value in local storage.
   * @param key - The key under which to store the value.
   * @param value - The value to store. Can be any type (will be stringified).
   */
  setItem<T>(key: string, value: T): void {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (e) {
      console.error('LocalStorageService: Error saving item to local storage', key, e);
    }
  }

  /**
   * Gets a value from local storage.
   * @param key - The key of the item to retrieve.
   * @returns The retrieved value, parsed back to its original type, or null if not found.
   */
  getItem<T>(key: string): T | null {
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : null;
    } catch (e) {
      console.error('LocalStorageService: Error getting or parsing item from local storage', key, e);
      return null;
    }
  }

  /**
   * Removes an item from local storage.
   * @param key - The key of the item to remove.
   */
  removeItem(key: string): void {
    try {
      localStorage.removeItem(key);
    } catch (e) {
      console.error('LocalStorageService: Error removing item from local storage', key, e);
    }
  }

  /**
   * Clears all items from local storage.
   */
  clear(): void {
    try {
      localStorage.clear();
    } catch (e) {
      console.error('LocalStorageService: Error clearing local storage', e);
    }
  }
}