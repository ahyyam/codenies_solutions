import { useToastActions } from '@/lib/contexts/ToastContext';

export interface ErrorDetails {
  message: string;
  code?: string;
  statusCode?: number;
  timestamp: Date;
  context?: Record<string, any>;
  stack?: string;
}

export class AppError extends Error {
  public readonly code?: string;
  public readonly statusCode?: number;
  public readonly context?: Record<string, any>;
  public readonly timestamp: Date;

  constructor(
    message: string,
    code?: string,
    statusCode?: number,
    context?: Record<string, any>
  ) {
    super(message);
    this.name = 'AppError';
    this.code = code;
    this.statusCode = statusCode;
    this.context = context;
    this.timestamp = new Date();
  }

  toDetails(): ErrorDetails {
    return {
      message: this.message,
      code: this.code,
      statusCode: this.statusCode,
      timestamp: this.timestamp,
      context: this.context,
      stack: this.stack
    };
  }
}

export class ValidationError extends AppError {
  constructor(message: string, field?: string) {
    super(message, 'VALIDATION_ERROR', 400, { field });
    this.name = 'ValidationError';
  }
}

export class NetworkError extends AppError {
  constructor(message: string, statusCode?: number) {
    super(message, 'NETWORK_ERROR', statusCode);
    this.name = 'NetworkError';
  }
}

export class AuthenticationError extends AppError {
  constructor(message: string = 'Authentication required') {
    super(message, 'AUTH_ERROR', 401);
    this.name = 'AuthenticationError';
  }
}

export class AuthorizationError extends AppError {
  constructor(message: string = 'Access denied') {
    super(message, 'AUTHORIZATION_ERROR', 403);
    this.name = 'AuthorizationError';
  }
}

export class NotFoundError extends AppError {
  constructor(resource: string = 'Resource') {
    super(`${resource} not found`, 'NOT_FOUND', 404);
    this.name = 'NotFoundError';
  }
}

// Error handler utility
export class ErrorHandler {
  private static instance: ErrorHandler;
  private errorReporters: Array<(error: ErrorDetails) => void> = [];

  static getInstance(): ErrorHandler {
    if (!ErrorHandler.instance) {
      ErrorHandler.instance = new ErrorHandler();
    }
    return ErrorHandler.instance;
  }

  addReporter(reporter: (error: ErrorDetails) => void): void {
    this.errorReporters.push(reporter);
  }

  removeReporter(reporter: (error: ErrorDetails) => void): void {
    const index = this.errorReporters.indexOf(reporter);
    if (index > -1) {
      this.errorReporters.splice(index, 1);
    }
  }

  handle(error: Error | AppError, context?: Record<string, any>): ErrorDetails {
    const errorDetails: ErrorDetails = error instanceof AppError 
      ? error.toDetails()
      : {
          message: error.message,
          timestamp: new Date(),
          context,
          stack: error.stack
        };

    // Report to all registered reporters
    this.errorReporters.forEach(reporter => {
      try {
        reporter(errorDetails);
      } catch (reporterError) {
        console.error('Error reporter failed:', reporterError);
      }
    });

    // Log to console in development
    if (process.env.NODE_ENV === 'development') {
      console.error('Error handled:', errorDetails);
    }

    return errorDetails;
  }
}

// React hook for error handling
export const useErrorHandler = () => {
  const toast = useToastActions();
  const errorHandler = ErrorHandler.getInstance();

  const handleError = React.useCallback((
    error: Error | AppError,
    options: {
      showToast?: boolean;
      toastTitle?: string;
      context?: Record<string, any>;
      onError?: (details: ErrorDetails) => void;
    } = {}
  ) => {
    const {
      showToast = true,
      toastTitle,
      context,
      onError
    } = options;

    const errorDetails = errorHandler.handle(error, context);

    // Show toast notification
    if (showToast) {
      const title = toastTitle || getErrorTitle(error);
      const message = getUserFriendlyMessage(error);
      
      toast.error(message, {
        title,
        duration: error instanceof ValidationError ? 5000 : 0
      });
    }

    // Call custom error handler
    if (onError) {
      onError(errorDetails);
    }

    return errorDetails;
  }, [toast, errorHandler]);

  const handleAsyncError = React.useCallback(async <T>(
    asyncFn: () => Promise<T>,
    options: {
      showToast?: boolean;
      toastTitle?: string;
      context?: Record<string, any>;
      onError?: (details: ErrorDetails) => void;
      onSuccess?: (result: T) => void;
    } = {}
  ): Promise<T | null> => {
    try {
      const result = await asyncFn();
      options.onSuccess?.(result);
      return result;
    } catch (error) {
      handleError(error instanceof Error ? error : new Error(String(error)), options);
      return null;
    }
  }, [handleError]);

  return {
    handleError,
    handleAsyncError
  };
};

// Helper functions
function getErrorTitle(error: Error): string {
  if (error instanceof ValidationError) return 'Validation Error';
  if (error instanceof NetworkError) return 'Network Error';
  if (error instanceof AuthenticationError) return 'Authentication Required';
  if (error instanceof AuthorizationError) return 'Access Denied';
  if (error instanceof NotFoundError) return 'Not Found';
  return 'Error';
}

function getUserFriendlyMessage(error: Error): string {
  if (error instanceof ValidationError) {
    return error.message;
  }
  
  if (error instanceof NetworkError) {
    if (error.statusCode === 500) {
      return 'Server error. Please try again later.';
    }
    if (error.statusCode === 404) {
      return 'The requested resource was not found.';
    }
    return 'Network error. Please check your connection and try again.';
  }
  
  if (error instanceof AuthenticationError) {
    return 'Please log in to continue.';
  }
  
  if (error instanceof AuthorizationError) {
    return 'You do not have permission to perform this action.';
  }
  
  if (error instanceof NotFoundError) {
    return error.message;
  }
  
  // Generic error message for unknown errors
  return 'An unexpected error occurred. Please try again.';
}

// Error boundary integration
export const setupGlobalErrorHandling = () => {
  const errorHandler = ErrorHandler.getInstance();

  // Handle unhandled promise rejections
  window.addEventListener('unhandledrejection', (event) => {
    const error = event.reason instanceof Error 
      ? event.reason 
      : new Error(String(event.reason));
    
    errorHandler.handle(error, { type: 'unhandledrejection' });
  });

  // Handle global errors
  window.addEventListener('error', (event) => {
    errorHandler.handle(event.error || new Error(event.message), {
      type: 'globalerror',
      filename: event.filename,
      lineno: event.lineno,
      colno: event.colno
    });
  });
};

// Import React for hooks
import React from 'react';