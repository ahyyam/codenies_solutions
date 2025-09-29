// Enhanced storage service with validation and error handling
import { AppErrorHandler } from '../utils/error-handling';

export class StorageService {
  private static instance: StorageService;
  private storage: Storage;

  private constructor() {
    this.storage = typeof window !== 'undefined' ? window.localStorage : {} as Storage;
  }

  static getInstance(): StorageService {
    if (!StorageService.instance) {
      StorageService.instance = new StorageService();
    }
    return StorageService.instance;
  }

  // Check if storage is available
  isAvailable(): boolean {
    try {
      if (typeof window === 'undefined') return false;
      
      const testKey = '__storage_test__';
      this.storage.setItem(testKey, 'test');
      this.storage.removeItem(testKey);
      return true;
    } catch {
      return false;
    }
  }

  // Get item with error handling and type safety
  getItem<T>(key: string, defaultValue?: T): T | null {
    try {
      if (!this.isAvailable()) {
        return defaultValue || null;
      }

      const item = this.storage.getItem(key);
      if (item === null) {
        return defaultValue || null;
      }

      return JSON.parse(item) as T;
    } catch (error) {
      AppErrorHandler.createError(
        'STORAGE_READ_ERROR',
        `Failed to read from storage key "${key}"`,
        { key, error }
      );
      return defaultValue || null;
    }
  }

  // Set item with error handling
  setItem<T>(key: string, value: T): boolean {
    try {
      if (!this.isAvailable()) {
        return false;
      }

      this.storage.setItem(key, JSON.stringify(value));
      return true;
    } catch (error) {
      AppErrorHandler.createError(
        'STORAGE_WRITE_ERROR',
        `Failed to write to storage key "${key}"`,
        { key, value, error }
      );
      return false;
    }
  }

  // Remove item
  removeItem(key: string): boolean {
    try {
      if (!this.isAvailable()) {
        return false;
      }

      this.storage.removeItem(key);
      return true;
    } catch (error) {
      AppErrorHandler.createError(
        'STORAGE_REMOVE_ERROR',
        `Failed to remove storage key "${key}"`,
        { key, error }
      );
      return false;
    }
  }

  // Clear all items
  clear(): boolean {
    try {
      if (!this.isAvailable()) {
        return false;
      }

      this.storage.clear();
      return true;
    } catch (error) {
      AppErrorHandler.createError(
        'STORAGE_CLEAR_ERROR',
        'Failed to clear storage',
        { error }
      );
      return false;
    }
  }

  // Get all keys
  getAllKeys(): string[] {
    try {
      if (!this.isAvailable()) {
        return [];
      }

      const keys: string[] = [];
      for (let i = 0; i < this.storage.length; i++) {
        const key = this.storage.key(i);
        if (key) keys.push(key);
      }
      return keys;
    } catch (error) {
      AppErrorHandler.createError(
        'STORAGE_KEYS_ERROR',
        'Failed to get storage keys',
        { error }
      );
      return [];
    }
  }

  // Get storage size (approximate)
  getStorageSize(): number {
    try {
      if (!this.isAvailable()) {
        return 0;
      }

      let size = 0;
      for (let i = 0; i < this.storage.length; i++) {
        const key = this.storage.key(i);
        if (key) {
          const value = this.storage.getItem(key);
          if (value) {
            size += key.length + value.length;
          }
        }
      }
      return size;
    } catch (error) {
      AppErrorHandler.createError(
        'STORAGE_SIZE_ERROR',
        'Failed to calculate storage size',
        { error }
      );
      return 0;
    }
  }

  // Export data
  exportData(): Record<string, any> {
    try {
      if (!this.isAvailable()) {
        return {};
      }

      const data: Record<string, any> = {};
      for (let i = 0; i < this.storage.length; i++) {
        const key = this.storage.key(i);
        if (key) {
          const value = this.storage.getItem(key);
          if (value) {
            try {
              data[key] = JSON.parse(value);
            } catch {
              data[key] = value; // Store as string if not JSON
            }
          }
        }
      }
      return data;
    } catch (error) {
      AppErrorHandler.createError(
        'STORAGE_EXPORT_ERROR',
        'Failed to export storage data',
        { error }
      );
      return {};
    }
  }

  // Import data
  importData(data: Record<string, any>, overwrite: boolean = false): boolean {
    try {
      if (!this.isAvailable()) {
        return false;
      }

      Object.entries(data).forEach(([key, value]) => {
        if (overwrite || !this.storage.getItem(key)) {
          this.setItem(key, value);
        }
      });

      return true;
    } catch (error) {
      AppErrorHandler.createError(
        'STORAGE_IMPORT_ERROR',
        'Failed to import storage data',
        { data, error }
      );
      return false;
    }
  }
}

// Export singleton instance
export const storageService = StorageService.getInstance();