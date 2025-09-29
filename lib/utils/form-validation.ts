/**
 * Real-time form validation utilities
 * Provides utilities for real-time form validation with debouncing and async validation
 */

import { useState, useCallback, useRef, useEffect } from 'react';
import { 
  ValidationResult, 
  ValidationError, 
  FormValidationState, 
  FieldValidationConfig,
  AsyncValidationResult,
  ValidationErrorMap
} from '../types/validation';
import { ContentValidator } from './validation';

/**
 * Real-time form validation hook
 */
export function useFormValidation<T extends Record<string, any>>(
  initialData: T,
  validationSchema: Record<keyof T, FieldValidationConfig>
) {
  const [state, setState] = useState<FormValidationState<T>>({
    data: initialData,
    errors: {} as Record<keyof T, string[]>,
    warnings: {} as Record<keyof T, string[]>,
    touched: {} as Record<keyof T, boolean>,
    isValid: false,
    isValidating: false,
    isDirty: false
  });

  const debounceTimers = useRef<Record<string, NodeJS.Timeout>>({});
  const asyncValidationCache = useRef<Record<string, AsyncValidationResult>>({});

  /**
   * Validate a single field
   */
  const validateField = useCallback(async (
    field: keyof T, 
    value: any, 
    immediate = false
  ): Promise<string[]> => {
    const config = validationSchema[field];
    if (!config) return [];

    const errors: string[] = [];

    // Required validation
    if (config.required && (!value || (typeof value === 'string' && value.trim() === ''))) {
      errors.push(`${String(field)} is required`);
      return errors;
    }

    // Skip other validations if field is empty and not required
    if (!value && !config.required) return errors;

    // Length validations
    if (typeof value === 'string') {
      if (config.minLength && value.length < config.minLength) {
        errors.push(`${String(field)} must be at least ${config.minLength} characters`);
      }
      if (config.maxLength && value.length > config.maxLength) {
        errors.push(`${String(field)} must not exceed ${config.maxLength} characters`);
      }
    }

    // Pattern validation
    if (config.pattern && typeof value === 'string' && !config.pattern.test(value)) {
      errors.push(`${String(field)} format is invalid`);
    }

    // Custom synchronous validation
    if (config.customValidator && !config.customValidator(value)) {
      errors.push(`${String(field)} is invalid`);
    }

    // Async validation
    if (config.asyncValidator && errors.length === 0) {
      const cacheKey = `${String(field)}_${value}`;
      
      if (!immediate && asyncValidationCache.current[cacheKey]) {
        const cachedResult = asyncValidationCache.current[cacheKey];
        if (!cachedResult.isValid && cachedResult.error) {
          errors.push(cachedResult.error);
        }
      } else {
        try {
          setState(prev => ({ ...prev, isValidating: true }));
          const result = await config.asyncValidator(value);
          asyncValidationCache.current[cacheKey] = result;
          
          if (!result.isValid && result.error) {
            errors.push(result.error);
          }
        } catch (error) {
          errors.push(`Validation failed for ${String(field)}`);
        } finally {
          setState(prev => ({ ...prev, isValidating: false }));
        }
      }
    }

    return errors;
  }, [validationSchema]);

  /**
   * Validate all fields
   */
  const validateAll = useCallback(async (): Promise<ValidationErrorMap> => {
    const allErrors: ValidationErrorMap = {};
    
    for (const field of Object.keys(state.data) as Array<keyof T>) {
      const fieldErrors = await validateField(field, state.data[field], true);
      if (fieldErrors.length > 0) {
        allErrors[String(field)] = fieldErrors;
      }
    }

    return allErrors;
  }, [state.data, validateField]);

  /**
   * Update field value with validation
   */
  const updateField = useCallback((field: keyof T, value: any) => {
    setState(prev => ({
      ...prev,
      data: { ...prev.data, [field]: value },
      touched: { ...prev.touched, [field]: true },
      isDirty: true
    }));

    // Clear existing timer for this field
    if (debounceTimers.current[String(field)]) {
      clearTimeout(debounceTimers.current[String(field)]);
    }

    // Set up debounced validation
    const debounceMs = validationSchema[field]?.debounceMs || 300;
    debounceTimers.current[String(field)] = setTimeout(async () => {
      const fieldErrors = await validateField(field, value);
      setState(prev => ({
        ...prev,
        errors: { ...prev.errors, [field]: fieldErrors },
        isValid: Object.values({ ...prev.errors, [field]: fieldErrors }).every(errs => errs.length === 0)
      }));
    }, debounceMs);
  }, [validationSchema, validateField]);

  /**
   * Set multiple field values
   */
  const setData = useCallback((newData: Partial<T>) => {
    setState(prev => ({
      ...prev,
      data: { ...prev.data, ...newData },
      isDirty: true
    }));
  }, []);

  /**
   * Reset form to initial state
   */
  const reset = useCallback(() => {
    setState({
      data: initialData,
      errors: {} as Record<keyof T, string[]>,
      warnings: {} as Record<keyof T, string[]>,
      touched: {} as Record<keyof T, boolean>,
      isValid: false,
      isValidating: false,
      isDirty: false
    });

    // Clear all debounce timers
    Object.values(debounceTimers.current).forEach(timer => clearTimeout(timer));
    debounceTimers.current = {};
    asyncValidationCache.current = {};
  }, [initialData]);

  /**
   * Mark field as touched
   */
  const touchField = useCallback((field: keyof T) => {
    setState(prev => ({
      ...prev,
      touched: { ...prev.touched, [field]: true }
    }));
  }, []);

  /**
   * Get field error message
   */
  const getFieldError = useCallback((field: keyof T): string | undefined => {
    const fieldErrors = state.errors[field];
    return fieldErrors && fieldErrors.length > 0 ? fieldErrors[0] : undefined;
  }, [state.errors]);

  /**
   * Check if field has error
   */
  const hasFieldError = useCallback((field: keyof T): boolean => {
    return state.touched[field] && state.errors[field]?.length > 0;
  }, [state.errors, state.touched]);

  // Cleanup timers on unmount
  useEffect(() => {
    return () => {
      Object.values(debounceTimers.current).forEach(timer => clearTimeout(timer));
    };
  }, []);

  return {
    ...state,
    updateField,
    setData,
    reset,
    touchField,
    validateAll,
    getFieldError,
    hasFieldError
  };
}

/**
 * Blog post validation schema
 */
export const blogPostValidationSchema = {
  title: {
    required: true,
    minLength: 3,
    maxLength: 100,
    pattern: /^[a-zA-Z0-9\s\-_.,!?()]+$/,
    debounceMs: 300
  },
  excerpt: {
    required: true,
    minLength: 50,
    maxLength: 300,
    debounceMs: 500
  },
  content: {
    required: true,
    minLength: 100,
    maxLength: 50000,
    debounceMs: 1000
  },
  authorId: {
    required: true,
    customValidator: (value: string) => ContentValidator.validateUUID(value)
  },
  categoryId: {
    required: true,
    customValidator: (value: string) => ContentValidator.validateUUID(value)
  }
};

/**
 * Project validation schema
 */
export const projectValidationSchema = {
  title: {
    required: true,
    minLength: 3,
    maxLength: 100,
    debounceMs: 300
  },
  description: {
    required: true,
    minLength: 50,
    maxLength: 1000,
    debounceMs: 500
  },
  categoryId: {
    required: true,
    customValidator: (value: string) => ContentValidator.validateUUID(value)
  },
  clientId: {
    required: true,
    customValidator: (value: string) => ContentValidator.validateUUID(value)
  }
};

/**
 * Utility function to create validation schema from content validator rules
 */
export function createValidationSchema<T>(
  rules: Record<keyof T, FieldValidationConfig>
): Record<keyof T, FieldValidationConfig> {
  return rules;
}

/**
 * Debounced validation function
 */
export function debounceValidation<T extends any[]>(
  fn: (...args: T) => void | Promise<void>,
  delay: number
): (...args: T) => void {
  let timeoutId: NodeJS.Timeout;
  
  return (...args: T) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => fn(...args), delay);
  };
}

/**
 * Batch validation for multiple fields
 */
export async function batchValidate<T>(
  data: T,
  validators: Record<keyof T, (value: any) => ValidationResult | Promise<ValidationResult>>
): Promise<ValidationResult> {
  const allErrors: ValidationError[] = [];
  
  for (const [field, validator] of Object.entries(validators) as Array<[keyof T, any]>) {
    try {
      const result = await validator(data[field]);
      if (!result.isValid) {
        allErrors.push(...result.errors);
      }
    } catch (error) {
      allErrors.push({
        field: String(field),
        message: `Validation failed for ${String(field)}`,
        code: 'VALIDATION_ERROR'
      });
    }
  }
  
  return {
    isValid: allErrors.length === 0,
    errors: allErrors
  };
}