export interface RetryOptions {
  maxAttempts?: number;
  delay?: number;
  backoff?: 'linear' | 'exponential';
  maxDelay?: number;
  onRetry?: (attempt: number, error: Error) => void;
  shouldRetry?: (error: Error) => boolean;
}

export class RetryError extends Error {
  public readonly attempts: number;
  public readonly lastError: Error;

  constructor(attempts: number, lastError: Error) {
    super(`Failed after ${attempts} attempts: ${lastError.message}`);
    this.name = 'RetryError';
    this.attempts = attempts;
    this.lastError = lastError;
  }
}

export async function retry<T>(
  fn: () => Promise<T>,
  options: RetryOptions = {}
): Promise<T> {
  const {
    maxAttempts = 3,
    delay = 1000,
    backoff = 'exponential',
    maxDelay = 30000,
    onRetry,
    shouldRetry = () => true
  } = options;

  let lastError: Error;
  
  for (let attempt = 1; attempt <= maxAttempts; attempt++) {
    try {
      return await fn();
    } catch (error) {
      lastError = error instanceof Error ? error : new Error(String(error));
      
      // Don't retry if we've reached max attempts or if shouldRetry returns false
      if (attempt === maxAttempts || !shouldRetry(lastError)) {
        throw new RetryError(attempt, lastError);
      }
      
      // Call onRetry callback if provided
      if (onRetry) {
        onRetry(attempt, lastError);
      }
      
      // Calculate delay for next attempt
      let nextDelay = delay;
      if (backoff === 'exponential') {
        nextDelay = Math.min(delay * Math.pow(2, attempt - 1), maxDelay);
      } else if (backoff === 'linear') {
        nextDelay = Math.min(delay * attempt, maxDelay);
      }
      
      // Wait before next attempt
      await new Promise(resolve => setTimeout(resolve, nextDelay));
    }
  }
  
  // This should never be reached, but TypeScript requires it
  throw new RetryError(maxAttempts, lastError!);
}

// Specific retry functions for common scenarios
export const retryNetworkRequest = <T>(
  fn: () => Promise<T>,
  options: Omit<RetryOptions, 'shouldRetry'> = {}
): Promise<T> => {
  return retry(fn, {
    ...options,
    shouldRetry: (error) => {
      // Retry on network errors, timeouts, and 5xx status codes
      if (error.name === 'NetworkError' || error.name === 'TimeoutError') {
        return true;
      }
      
      // Check for fetch response errors
      if ('status' in error && typeof error.status === 'number') {
        return error.status >= 500 || error.status === 408 || error.status === 429;
      }
      
      return false;
    }
  });
};

export const retryWithBackoff = <T>(
  fn: () => Promise<T>,
  maxAttempts: number = 3
): Promise<T> => {
  return retry(fn, {
    maxAttempts,
    delay: 1000,
    backoff: 'exponential',
    maxDelay: 10000
  });
};

// React hook for retry functionality
export const useRetry = () => {
  const [isRetrying, setIsRetrying] = React.useState(false);
  const [retryCount, setRetryCount] = React.useState(0);
  
  const executeWithRetry = React.useCallback(async <T>(
    fn: () => Promise<T>,
    options: RetryOptions = {}
  ): Promise<T> => {
    setIsRetrying(true);
    setRetryCount(0);
    
    try {
      const result = await retry(fn, {
        ...options,
        onRetry: (attempt, error) => {
          setRetryCount(attempt);
          options.onRetry?.(attempt, error);
        }
      });
      
      setIsRetrying(false);
      setRetryCount(0);
      return result;
    } catch (error) {
      setIsRetrying(false);
      throw error;
    }
  }, []);
  
  return {
    executeWithRetry,
    isRetrying,
    retryCount
  };
};

// Import React for the hook
import React from 'react';