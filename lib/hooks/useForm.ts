// Form management hook with validation and submission
import { useState, useCallback, useEffect } from 'react';
import { 
  FormValidationState, 
  ValidationResult, 
  FormSubmissionState,
  FormSubmissionResult 
} from '../types/validation';
import { useDebounce } from './useDebounce';

interface UseFormOptions<T> {
  initialValues: T;
  validate?: (values: T) => ValidationResult;
  onSubmit?: (values: T) => Promise<FormSubmissionResult<T>>;
  validateOnChange?: boolean;
  validateOnBlur?: boolean;
  debounceMs?: number;
}

export function useForm<T extends Record<string, any>>(
  options: UseFormOptions<T>
) {
  const {
    initialValues,
    validate,
    onSubmit,
    validateOnChange = true,
    validateOnBlur = true,
    debounceMs = 300
  } = options;

  const [values, setValues] = useState<T>(initialValues);
  const [errors, setErrors] = useState<Record<keyof T, string[]>>({} as Record<keyof T, string[]>);
  const [warnings, setWarnings] = useState<Record<keyof T, string[]>>({} as Record<keyof T, string[]>);
  const [touched, setTouched] = useState<Record<keyof T, boolean>>({} as Record<keyof T, boolean>);
  const [submissionState, setSubmissionState] = useState<FormSubmissionState>(FormSubmissionState.IDLE);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const debouncedValues = useDebounce(values, debounceMs);

  // Validate form
  const validateForm = useCallback((formValues: T = values): ValidationResult => {
    if (!validate) {
      return { isValid: true, errors: [] };
    }
    return validate(formValues);
  }, [validate, values]);

  // Update validation state
  const updateValidation = useCallback((validationResult: ValidationResult) => {
    const newErrors: Record<keyof T, string[]> = {} as Record<keyof T, string[]>;
    const newWarnings: Record<keyof T, string[]> = {} as Record<keyof T, string[]>;

    validationResult.errors.forEach(error => {
      const field = error.field as keyof T;
      if (!newErrors[field]) newErrors[field] = [];
      newErrors[field].push(error.message);
    });

    validationResult.warnings?.forEach(warning => {
      const field = warning.field as keyof T;
      if (!newWarnings[field]) newWarnings[field] = [];
      newWarnings[field].push(warning.message);
    });

    setErrors(newErrors);
    setWarnings(newWarnings);
  }, []);

  // Validate on value changes (debounced)
  useEffect(() => {
    if (validateOnChange && validate) {
      const validationResult = validateForm(debouncedValues);
      updateValidation(validationResult);
    }
  }, [debouncedValues, validateOnChange, validateForm, updateValidation]);

  // Set field value
  const setFieldValue = useCallback((field: keyof T, value: any) => {
    setValues(prev => ({ ...prev, [field]: value }));
    
    // Mark field as dirty
    const isDirty = value !== initialValues[field];
    if (isDirty) {
      setTouched(prev => ({ ...prev, [field]: true }));
    }
  }, [initialValues]);

  // Set field touched
  const setFieldTouched = useCallback((field: keyof T, isTouched: boolean = true) => {
    setTouched(prev => ({ ...prev, [field]: isTouched }));
    
    if (validateOnBlur && isTouched && validate) {
      const validationResult = validateForm();
      updateValidation(validationResult);
    }
  }, [validateOnBlur, validate, validateForm, updateValidation]);

  // Handle field change
  const handleChange = useCallback((field: keyof T) => (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const value = event.target.type === 'checkbox' 
      ? (event.target as HTMLInputElement).checked
      : event.target.value;
    
    setFieldValue(field, value);
  }, [setFieldValue]);

  // Handle field blur
  const handleBlur = useCallback((field: keyof T) => () => {
    setFieldTouched(field, true);
  }, [setFieldTouched]);

  // Submit form
  const handleSubmit = useCallback(async (event?: React.FormEvent) => {
    event?.preventDefault();
    
    if (!onSubmit) return;

    setSubmissionState(FormSubmissionState.VALIDATING);
    setSubmitError(null);

    // Validate before submission
    const validationResult = validateForm();
    updateValidation(validationResult);

    if (!validationResult.isValid) {
      setSubmissionState(FormSubmissionState.ERROR);
      setSubmitError('Please fix the validation errors before submitting.');
      return;
    }

    setSubmissionState(FormSubmissionState.SUBMITTING);

    try {
      const result = await onSubmit(values);
      
      if (result.success) {
        setSubmissionState(FormSubmissionState.SUCCESS);
        // Reset form on successful submission
        reset();
      } else {
        setSubmissionState(FormSubmissionState.ERROR);
        setSubmitError(result.message || 'Submission failed');
        
        if (result.errors) {
          const newErrors: Record<keyof T, string[]> = {} as Record<keyof T, string[]>;
          Object.entries(result.errors).forEach(([field, fieldErrors]) => {
            newErrors[field as keyof T] = fieldErrors;
          });
          setErrors(newErrors);
        }
      }
    } catch (error) {
      setSubmissionState(FormSubmissionState.ERROR);
      setSubmitError(error instanceof Error ? error.message : 'An unexpected error occurred');
    }
  }, [onSubmit, values, validateForm, updateValidation]);

  // Reset form
  const reset = useCallback(() => {
    setValues(initialValues);
    setErrors({} as Record<keyof T, string[]>);
    setWarnings({} as Record<keyof T, string[]>);
    setTouched({} as Record<keyof T, boolean>);
    setSubmissionState(FormSubmissionState.IDLE);
    setSubmitError(null);
  }, [initialValues]);

  // Check if form is dirty
  const isDirty = Object.keys(touched).some(key => touched[key as keyof T]);
  
  // Check if form is valid
  const isValid = Object.keys(errors).length === 0;
  
  // Check if form is submitting
  const isSubmitting = submissionState === FormSubmissionState.SUBMITTING;
  
  // Check if form is validating
  const isValidating = submissionState === FormSubmissionState.VALIDATING;

  return {
    // Form state
    values,
    errors,
    warnings,
    touched,
    isDirty,
    isValid,
    isSubmitting,
    isValidating,
    submissionState,
    submitError,

    // Form actions
    setFieldValue,
    setFieldTouched,
    handleChange,
    handleBlur,
    handleSubmit,
    reset,
    validateForm,

    // Helper functions
    getFieldProps: (field: keyof T) => ({
      value: values[field] || '',
      onChange: handleChange(field),
      onBlur: handleBlur(field),
      error: errors[field]?.[0],
      hasError: Boolean(errors[field]?.length),
      hasWarning: Boolean(warnings[field]?.length),
      isTouched: Boolean(touched[field])
    })
  };
}