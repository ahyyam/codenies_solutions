// Error handling utilities and classes
import { AppError, ApiError, ValidationErrorMap } from '../types/validation';

export class AppErrorHandler {
  private static errorLog: AppError[] = [];

  static createError(code: string, message: string, details?: any): AppError {
    const error: AppError = {
      code,
      message,
      details,
      timestamp: new Date(),
      stack: new Error().stack
    };
    
    this.logError(error);
    return error;
  }

  static createApiError(
    status: number,
    message: string,
    endpoint: string,
    method: string,
    details?: any
  ): ApiError {
    const error: ApiError = {
      code: `API_ERROR_${status}`,
      message,
      status,
      endpoint,
      method,
      details,
      timestamp: new Date(),
      stack: new Error().stack
    };
    
    this.logError(error);
    return error;
  }

  static logError(error: AppError): void {
    this.errorLog.push(error);
    
    // In development, log to console
    if (process.env.NODE_ENV === 'development') {
      console.error('Application Error:', error);
    }
    
    // In production, you might want to send to an error tracking service
    // Example: Sentry, LogRocket, etc.
  }

  static getErrorLog(): AppError[] {
    return [...this.errorLog];
  }

  static clearErrorLog(): void {
    this.errorLog = [];
  }

  static formatErrorForUser(error: AppError): string {
    // Return user-friendly error messages
    switch (error.code) {
      case 'VALIDATION_ERROR':
        return 'Please check your input and try again.';
      case 'NETWORK_ERROR':
        return 'Network error. Please check your connection and try again.';
      case 'PERMISSION_DENIED':
        return 'You do not have permission to perform this action.';
      case 'NOT_FOUND':
        return 'The requested item was not found.';
      case 'SERVER_ERROR':
        return 'A server error occurred. Please try again later.';
      default:
        return error.message || 'An unexpected error occurred.';
    }
  }
}

export class ValidationErrorHandler {
  static formatValidationErrors(errors: ValidationErrorMap): string[] {
    const messages: string[] = [];
    
    Object.entries(errors).forEach(([field, fieldErrors]) => {
      fieldErrors.forEach(error => {
        messages.push(`${this.formatFieldName(field)}: ${error}`);
      });
    });
    
    return messages;
  }

  static formatFieldName(field: string): string {
    // Convert camelCase or snake_case to readable format
    return field
      .replace(/([A-Z])/g, ' $1')
      .replace(/_/g, ' ')
      .replace(/^./, str => str.toUpperCase())
      .trim();
  }

  static groupErrorsByField(errors: ValidationErrorMap): Record<string, string> {
    const grouped: Record<string, string> = {};
    
    Object.entries(errors).forEach(([field, fieldErrors]) => {
      grouped[field] = fieldErrors.join(', ');
    });
    
    return grouped;
  }
}

export class AsyncErrorHandler {
  static async withErrorHandling<T>(
    operation: () => Promise<T>,
    errorContext?: string
  ): Promise<{ data?: T; error?: AppError }> {
    try {
      const data = await operation();
      return { data };
    } catch (err) {
      const error = AppErrorHandler.createError(
        'ASYNC_OPERATION_ERROR',
        `Error in ${errorContext || 'async operation'}: ${err instanceof Error ? err.message : 'Unknown error'}`,
        { originalError: err, context: errorContext }
      );
      return { error };
    }
  }

  static async retry<T>(
    operation: () => Promise<T>,
    maxAttempts: number = 3,
    delay: number = 1000
  ): Promise<T> {
    let lastError: Error;
    
    for (let attempt = 1; attempt <= maxAttempts; attempt++) {
      try {
        return await operation();
      } catch (error) {
        lastError = error instanceof Error ? error : new Error(String(error));
        
        if (attempt === maxAttempts) {
          throw AppErrorHandler.createError(
            'MAX_RETRIES_EXCEEDED',
            `Operation failed after ${maxAttempts} attempts: ${lastError.message}`,
            { attempts: maxAttempts, lastError }
          );
        }
        
        // Wait before retrying
        await new Promise(resolve => setTimeout(resolve, delay * attempt));
      }
    }
    
    throw lastError!;
  }
}

export class ErrorBoundaryHelper {
  static getErrorInfo(error: Error, errorInfo: any) {
    return {
      message: error.message,
      stack: error.stack,
      componentStack: errorInfo?.componentStack,
      timestamp: new Date().toISOString()
    };
  }

  static shouldRecover(error: Error): boolean {
    // Define which errors are recoverable
    const recoverableErrors = [
      'ChunkLoadError',
      'Loading chunk',
      'Network Error'
    ];
    
    return recoverableErrors.some(recoverable => 
      error.message.includes(recoverable)
    );
  }

  static getRecoveryAction(error: Error): string {
    if (error.message.includes('ChunkLoadError') || error.message.includes('Loading chunk')) {
      return 'refresh';
    }
    if (error.message.includes('Network Error')) {
      return 'retry';
    }
    return 'report';
  }
}

// Custom error classes
export class ValidationError extends Error {
  constructor(
    message: string,
    public field: string,
    public code: string,
    public value?: any
  ) {
    super(message);
    this.name = 'ValidationError';
  }
}

export class NetworkError extends Error {
  constructor(
    message: string,
    public status?: number,
    public endpoint?: string
  ) {
    super(message);
    this.name = 'NetworkError';
  }
}

export class PermissionError extends Error {
  constructor(
    message: string,
    public requiredPermission: string,
    public userPermissions: string[]
  ) {
    super(message);
    this.name = 'PermissionError';
  }
}

export class NotFoundError extends Error {
  constructor(
    message: string,
    public resourceType: string,
    public resourceId: string
  ) {
    super(message);
    this.name = 'NotFoundError';
  }
}

// Error recovery utilities
export const errorRecovery = {
  async withFallback<T>(
    primary: () => Promise<T>,
    fallback: () => Promise<T>
  ): Promise<T> {
    try {
      return await primary();
    } catch (error) {
      console.warn('Primary operation failed, using fallback:', error);
      return await fallback();
    }
  },

  withDefault<T>(operation: () => T, defaultValue: T): T {
    try {
      return operation();
    } catch (error) {
      console.warn('Operation failed, using default value:', error);
      return defaultValue;
    }
  },

  async withTimeout<T>(
    operation: () => Promise<T>,
    timeoutMs: number,
    timeoutMessage: string = 'Operation timed out'
  ): Promise<T> {
    const timeoutPromise = new Promise<never>((_, reject) => {
      setTimeout(() => reject(new Error(timeoutMessage)), timeoutMs);
    });

    return Promise.race([operation(), timeoutPromise]);
  }
};