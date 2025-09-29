// Validation utilities and error handling types

export interface ValidationResult {
  isValid: boolean;
  errors: ValidationError[];
  warnings?: ValidationWarning[];
}

export interface ValidationError {
  field: string;
  message: string;
  code: string;
  value?: any;
}

export interface ValidationWarning {
  field: string;
  message: string;
  code: string;
  value?: any;
}

export interface ValidationRule<T> {
  field: keyof T;
  validator: (value: any, data?: T) => boolean;
  message: string;
  code: string;
  required?: boolean;
}

export interface ValidationSchema<T> {
  rules: ValidationRule<T>[];
  customValidators?: Array<(data: T) => ValidationError[]>;
}

// Common validation error codes
export enum ValidationErrorCode {
  REQUIRED = 'REQUIRED',
  INVALID_FORMAT = 'INVALID_FORMAT',
  TOO_SHORT = 'TOO_SHORT',
  TOO_LONG = 'TOO_LONG',
  INVALID_EMAIL = 'INVALID_EMAIL',
  INVALID_URL = 'INVALID_URL',
  INVALID_DATE = 'INVALID_DATE',
  DUPLICATE_VALUE = 'DUPLICATE_VALUE',
  INVALID_SLUG = 'INVALID_SLUG',
  INVALID_UUID = 'INVALID_UUID',
  INVALID_IMAGE = 'INVALID_IMAGE',
  INVALID_CONTENT = 'INVALID_CONTENT',
  INVALID_RANGE = 'INVALID_RANGE',
  INVALID_SELECTION = 'INVALID_SELECTION'
}

// Form validation state
export interface FormValidationState<T> {
  data: T;
  errors: Record<keyof T, string[]>;
  warnings: Record<keyof T, string[]>;
  touched: Record<keyof T, boolean>;
  isValid: boolean;
  isValidating: boolean;
  isDirty: boolean;
}

// Async validation result
export interface AsyncValidationResult {
  isValid: boolean;
  error?: string;
  suggestions?: string[];
}

// Field validation configuration
export interface FieldValidationConfig {
  required?: boolean;
  minLength?: number;
  maxLength?: number;
  pattern?: RegExp;
  customValidator?: (value: any) => boolean | Promise<boolean>;
  asyncValidator?: (value: any) => Promise<AsyncValidationResult>;
  debounceMs?: number;
}

// Content validation specific types
export interface ContentValidationRules {
  title: {
    minLength: number;
    maxLength: number;
    pattern?: RegExp;
  };
  slug: {
    pattern: RegExp;
    reservedSlugs: string[];
  };
  excerpt: {
    minLength: number;
    maxLength: number;
  };
  content: {
    minLength: number;
    maxLength: number;
    allowedTags: string[];
    forbiddenWords: string[];
  };
  seo: {
    titleMaxLength: number;
    descriptionMaxLength: number;
    keywordsMaxCount: number;
  };
}

// Error handling types
export interface AppError {
  code: string;
  message: string;
  details?: any;
  timestamp: Date;
  stack?: string;
}

export interface ErrorBoundaryState {
  hasError: boolean;
  error?: Error;
  errorInfo?: any;
}

export interface ApiError extends AppError {
  status: number;
  endpoint: string;
  method: string;
}

export interface ValidationErrorMap {
  [field: string]: string[];
}

// Form submission states
export enum FormSubmissionState {
  IDLE = 'idle',
  VALIDATING = 'validating',
  SUBMITTING = 'submitting',
  SUCCESS = 'success',
  ERROR = 'error'
}

export interface FormSubmissionResult<T> {
  success: boolean;
  data?: T;
  errors?: ValidationErrorMap;
  message?: string;
}