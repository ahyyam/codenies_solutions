// Real-time validation hook
import { useState, useCallback, useEffect } from 'react';
import { 
  ValidationResult, 
  ValidationError, 
  AsyncValidationResult,
  FieldValidationConfig 
} from '../types/validation';
import { useDebounce } from './useDebounce';

interface UseValidationOptions<T> {
  initialValues: T;
  validationRules: Record<keyof T, FieldValidationConfig>;
  validateOnChange?: boolean;
  validateOnBlur?: boolean;
  debounceMs?: number;
}

export function useValidation<T extends Record<string, any>>(
  options: UseValidationOptions<T>
) {
  const {
    initialValues,
    validationRules,
    validateOnChange = true,
    validateOnBlur = true,
    debounceMs = 300
  } = options;

  const [values, setValues] = useState<T>(initialValues);
  const [errors, setErrors] = useState<Record<keyof T, string[]>>({} as Record<keyof T, string[]>);
  const [validating, setValidating] = useState<Record<keyof T, boolean>>({} as Record<keyof T, boolean>);
  const [touched, setTouched] = useState<Record<keyof T, boolean>>({} as Record<keyof T, boolean>);

  const debouncedValues = useDebounce(values, debounceMs);

  // Validate a single field
  const validateField = useCallback(async (
    field: keyof T, 
    value: any, 
    allValues: T = values
  ): Promise<ValidationResult> => {
    const rules = validationRules[field];
    if (!rules) {
      return { isValid: true, errors: [] };
    }

    const fieldErrors: ValidationError[] = [];

    // Required validation
    if (rules.required && (value == null || value === '' || 
        (Array.isArray(value) && value.length === 0))) {
      fieldErrors.push({
        field: String(field),
        message: `${String(field)} is required`,
        code: 'REQUIRED'
      });
    }

    // Skip other validations if field is empty and not required
    if (!rules.required && (value == null || value === '')) {
      return { isValid: true, errors: [] };
    }

    // Min length validation
    if (rules.minLength && typeof value === 'string' && value.length < rules.minLength) {
      fieldErrors.push({
        field: String(field),
        message: `${String(field)} must be at least ${rules.minLength} characters`,
        code: 'TOO_SHORT',
        value: value.length
      });
    }

    // Max length validation
    if (rules.maxLength && typeof value === 'string' && value.length > rules.maxLength) {
      fieldErrors.push({
        field: String(field),
        message: `${String(field)} must not exceed ${rules.maxLength} characters`,
        code: 'TOO_LONG',
        value: value.length
      });
    }

    // Pattern validation
    if (rules.pattern && typeof value === 'string' && !rules.pattern.test(value)) {
      fieldErrors.push({
        field: String(field),
        message: `${String(field)} format is invalid`,
        code: 'INVALID_FORMAT',
        value
      });
    }

    // Custom synchronous validation
    if (rules.customValidator && !rules.customValidator(value)) {
      fieldErrors.push({
        field: String(field),
        message: `${String(field)} is invalid`,
        code: 'CUSTOM_VALIDATION_FAILED',
        value
      });
    }

    // Async validation
    if (rules.asyncValidator) {
      setValidating(prev => ({ ...prev, [field]: true }));
      
      try {
        const asyncResult = await rules.asyncValidator(value);
        if (!asyncResult.isValid && asyncResult.error) {
          fieldErrors.push({
            field: String(field),
            message: asyncResult.error,
            code: 'ASYNC_VALIDATION_FAILED',
            value
          });
        }
      } catch (error) {
        fieldErrors.push({
          field: String(field),
          message: `Validation error: ${error instanceof Error ? error.message : 'Unknown error'}`,
          code: 'ASYNC_VALIDATION_ERROR',
          value
        });
      } finally {
        setValidating(prev => ({ ...prev, [field]: false }));
      }
    }

    return {
      isValid: fieldErrors.length === 0,
      errors: fieldErrors
    };
  }, [validationRules, values]);

  // Validate all fields
  const validateAll = useCallback(async (valuesToValidate: T = values): Promise<ValidationResult> => {
    const allErrors: ValidationError[] = [];
    
    for (const field of Object.keys(validationRules) as (keyof T)[]) {
      const fieldResult = await validateField(field, valuesToValidate[field], valuesToValidate);
      allErrors.push(...fieldResult.errors);
    }

    return {
      isValid: allErrors.length === 0,
      errors: allErrors
    };
  }, [validationRules, validateField, values]);

  // Update field errors
  const updateFieldErrors = useCallback((field: keyof T, fieldErrors: ValidationError[]) => {
    setErrors(prev => ({
      ...prev,
      [field]: fieldErrors.map(error => error.message)
    }));
  }, []);

  // Validate field on change
  useEffect(() => {
    if (!validateOnChange) return;

    const validateChangedFields = async () => {
      for (const field of Object.keys(debouncedValues) as (keyof T)[]) {
        if (touched[field] && validationRules[field]) {
          const result = await validateField(field, debouncedValues[field]);
          updateFieldErrors(field, result.errors);
        }
      }
    };

    validateChangedFields();
  }, [debouncedValues, validateOnChange, touched, validationRules, validateField, updateFieldErrors]);

  // Set field value
  const setFieldValue = useCallback((field: keyof T, value: any) => {
    setValues(prev => ({ ...prev, [field]: value }));
  }, []);

  // Set field touched
  const setFieldTouched = useCallback(async (field: keyof T, isTouched: boolean = true) => {
    setTouched(prev => ({ ...prev, [field]: isTouched }));
    
    if (validateOnBlur && isTouched && validationRules[field]) {
      const result = await validateField(field, values[field]);
      updateFieldErrors(field, result.errors);
    }
  }, [validateOnBlur, validationRules, validateField, values, updateFieldErrors]);

  // Clear field error
  const clearFieldError = useCallback((field: keyof T) => {
    setErrors(prev => {
      const newErrors = { ...prev };
      delete newErrors[field];
      return newErrors;
    });
  }, []);

  // Clear all errors
  const clearAllErrors = useCallback(() => {
    setErrors({} as Record<keyof T, string[]>);
  }, []);

  // Reset validation state
  const reset = useCallback(() => {
    setValues(initialValues);
    setErrors({} as Record<keyof T, string[]>);
    setValidating({} as Record<keyof T, boolean>);
    setTouched({} as Record<keyof T, boolean>);
  }, [initialValues]);

  // Check if form is valid
  const isValid = Object.keys(errors).length === 0;
  
  // Check if any field is validating
  const isValidating = Object.values(validating).some(Boolean);
  
  // Check if form is dirty
  const isDirty = Object.keys(touched).some(key => touched[key as keyof T]);

  // Get field validation state
  const getFieldState = useCallback((field: keyof T) => {
    return {
      value: values[field],
      error: errors[field]?.[0],
      errors: errors[field] || [],
      hasError: Boolean(errors[field]?.length),
      isValidating: Boolean(validating[field]),
      isTouched: Boolean(touched[field]),
      isDirty: values[field] !== initialValues[field]
    };
  }, [values, errors, validating, touched, initialValues]);

  return {
    // Current state
    values,
    errors,
    validating,
    touched,
    isValid,
    isValidating,
    isDirty,

    // Actions
    setFieldValue,
    setFieldTouched,
    validateField,
    validateAll,
    clearFieldError,
    clearAllErrors,
    reset,

    // Utilities
    getFieldState,
    updateFieldErrors
  };
}