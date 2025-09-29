// Error boundary hook for component error handling
import { useState, useCallback } from 'react';
import { ErrorBoundaryState } from '../types/validation';
import { AppErrorHandler, ErrorBoundaryHelper } from '../utils/error-handling';

export function useErrorBoundary() {
  const [state, setState] = useState<ErrorBoundaryState>({
    hasError: false,
    error: undefined,
    errorInfo: undefined
  });

  // Capture error
  const captureError = useCallback((error: Error, errorInfo?: any) => {
    const appError = AppErrorHandler.createError(
      'COMPONENT_ERROR',
      `Component error: ${error.message}`,
      ErrorBoundaryHelper.getErrorInfo(error, errorInfo)
    );

    setState({
      hasError: true,
      error,
      errorInfo
    });

    // Log error for debugging
    console.error('Component Error Boundary:', appError);
  }, []);

  // Reset error state
  const resetError = useCallback(() => {
    setState({
      hasError: false,
      error: undefined,
      errorInfo: undefined
    });
  }, []);

  // Check if error is recoverable
  const isRecoverable = state.error ? ErrorBoundaryHelper.shouldRecover(state.error) : false;

  // Get recovery action
  const recoveryAction = state.error ? ErrorBoundaryHelper.getRecoveryAction(state.error) : null;

  // Perform recovery action
  const performRecovery = useCallback(() => {
    if (!state.error || !recoveryAction) return;

    switch (recoveryAction) {
      case 'refresh':
        window.location.reload();
        break;
      case 'retry':
        resetError();
        break;
      case 'report':
        // In a real app, you might send error to a reporting service
        console.error('Error reported:', state.error);
        resetError();
        break;
      default:
        resetError();
    }
  }, [state.error, recoveryAction, resetError]);

  return {
    // State
    hasError: state.hasError,
    error: state.error,
    errorInfo: state.errorInfo,
    isRecoverable,
    recoveryAction,

    // Actions
    captureError,
    resetError,
    performRecovery
  };
}

// Hook for throwing errors to be caught by error boundaries
export function useThrowError() {
  const throwError = useCallback((error: Error | string) => {
    const errorToThrow = typeof error === 'string' ? new Error(error) : error;
    throw errorToThrow;
  }, []);

  return throwError;
}