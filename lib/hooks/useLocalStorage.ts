// Enhanced localStorage hook with error handling and serialization
import { useState, useEffect, useCallback } from 'react';
import { AppErrorHandler } from '../utils/error-handling';

export function useLocalStorage<T>(
  key: string,
  initialValue: T,
  options: {
    serialize?: (value: T) => string;
    deserialize?: (value: string) => T;
    errorOnFailure?: boolean;
  } = {}
) {
  const {
    serialize = JSON.stringify,
    deserialize = JSON.parse,
    errorOnFailure = false
  } = options;

  // Get initial value from localStorage or use provided initial value
  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      if (typeof window === 'undefined') {
        return initialValue;
      }

      const item = window.localStorage.getItem(key);
      if (item === null) {
        return initialValue;
      }

      return deserialize(item);
    } catch (error) {
      const appError = AppErrorHandler.createError(
        'LOCALSTORAGE_READ_ERROR',
        `Failed to read from localStorage key "${key}"`,
        { key, error }
      );

      if (errorOnFailure) {
        throw appError;
      }

      console.warn('localStorage read error:', appError);
      return initialValue;
    }
  });

  // Update localStorage when state changes
  const setValue = useCallback((value: T | ((val: T) => T)) => {
    try {
      const valueToStore = value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);

      if (typeof window !== 'undefined') {
        window.localStorage.setItem(key, serialize(valueToStore));
      }
    } catch (error) {
      const appError = AppErrorHandler.createError(
        'LOCALSTORAGE_WRITE_ERROR',
        `Failed to write to localStorage key "${key}"`,
        { key, value, error }
      );

      if (errorOnFailure) {
        throw appError;
      }

      console.warn('localStorage write error:', appError);
    }
  }, [key, serialize, storedValue, errorOnFailure]);

  // Remove item from localStorage
  const removeValue = useCallback(() => {
    try {
      setStoredValue(initialValue);
      if (typeof window !== 'undefined') {
        window.localStorage.removeItem(key);
      }
    } catch (error) {
      const appError = AppErrorHandler.createError(
        'LOCALSTORAGE_REMOVE_ERROR',
        `Failed to remove localStorage key "${key}"`,
        { key, error }
      );

      if (errorOnFailure) {
        throw appError;
      }

      console.warn('localStorage remove error:', appError);
    }
  }, [key, initialValue, errorOnFailure]);

  // Check if localStorage is available
  const isAvailable = useCallback(() => {
    try {
      if (typeof window === 'undefined') return false;
      
      const testKey = '__localStorage_test__';
      window.localStorage.setItem(testKey, 'test');
      window.localStorage.removeItem(testKey);
      return true;
    } catch {
      return false;
    }
  }, []);

  return [storedValue, setValue, removeValue, isAvailable] as const;
}