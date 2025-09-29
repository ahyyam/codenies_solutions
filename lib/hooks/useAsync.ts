// Async operations hook with loading states and error handling
import { useState, useEffect, useCallback } from 'react';
import { AppErrorHandler } from '../utils/error-handling';
import { AppError } from '../types/validation';

interface AsyncState<T> {
  data: T | null;
  loading: boolean;
  error: AppError | null;
}

interface UseAsyncOptions {
  immediate?: boolean;
  onSuccess?: (data: any) => void;
  onError?: (error: AppError) => void;
}

export function useAsync<T>(
  asyncFunction: () => Promise<T>,
  dependencies: any[] = [],
  options: UseAsyncOptions = {}
) {
  const { immediate = true, onSuccess, onError } = options;
  
  const [state, setState] = useState<AsyncState<T>>({
    data: null,
    loading: false,
    error: null
  });

  const execute = useCallback(async () => {
    setState(prev => ({ ...prev, loading: true, error: null }));

    try {
      const data = await asyncFunction();
      setState({ data, loading: false, error: null });
      onSuccess?.(data);
      return data;
    } catch (err) {
      const error = AppErrorHandler.createError(
        'ASYNC_OPERATION_ERROR',
        err instanceof Error ? err.message : 'Unknown async error',
        { originalError: err }
      );
      setState({ data: null, loading: false, error });
      onError?.(error);
      throw error;
    }
  }, dependencies);

  useEffect(() => {
    if (immediate) {
      execute();
    }
  }, [execute, immediate]);

  const reset = useCallback(() => {
    setState({ data: null, loading: false, error: null });
  }, []);

  return {
    ...state,
    execute,
    reset
  };
}

export function useAsyncCallback<T extends any[], R>(
  asyncFunction: (...args: T) => Promise<R>,
  options: UseAsyncOptions = {}
) {
  const { onSuccess, onError } = options;
  
  const [state, setState] = useState<AsyncState<R>>({
    data: null,
    loading: false,
    error: null
  });

  const execute = useCallback(async (...args: T) => {
    setState(prev => ({ ...prev, loading: true, error: null }));

    try {
      const data = await asyncFunction(...args);
      setState({ data, loading: false, error: null });
      onSuccess?.(data);
      return data;
    } catch (err) {
      const error = AppErrorHandler.createError(
        'ASYNC_CALLBACK_ERROR',
        err instanceof Error ? err.message : 'Unknown async callback error',
        { originalError: err, args }
      );
      setState({ data: null, loading: false, error });
      onError?.(error);
      throw error;
    }
  }, [asyncFunction, onSuccess, onError]);

  const reset = useCallback(() => {
    setState({ data: null, loading: false, error: null });
  }, []);

  return {
    ...state,
    execute,
    reset
  };
}