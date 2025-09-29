import { useCallback, useEffect, useRef, useState } from 'react';
import { useToastActions } from '@/lib/contexts/ToastContext';
import { retry } from '@/lib/utils/retry';

export interface AutoSaveOptions<T> {
  key: string;
  data: T;
  saveFunction: (data: T) => Promise<void>;
  delay?: number;
  enabled?: boolean;
  onSaveStart?: () => void;
  onSaveSuccess?: () => void;
  onSaveError?: (error: Error) => void;
  showToasts?: boolean;
  retryOptions?: {
    maxAttempts?: number;
    delay?: number;
  };
}

export interface AutoSaveState {
  isSaving: boolean;
  lastSaved: Date | null;
  hasUnsavedChanges: boolean;
  saveError: Error | null;
}

export const useAutoSaveEnhanced = <T>({
  key,
  data,
  saveFunction,
  delay = 2000,
  enabled = true,
  onSaveStart,
  onSaveSuccess,
  onSaveError,
  showToasts = true,
  retryOptions = { maxAttempts: 3, delay: 1000 }
}: AutoSaveOptions<T>) => {
  const [state, setState] = useState<AutoSaveState>({
    isSaving: false,
    lastSaved: null,
    hasUnsavedChanges: false,
    saveError: null
  });

  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const lastDataRef = useRef<T>(data);
  const saveCountRef = useRef(0);
  const toast = useToastActions();

  // Check if data has changed
  const hasDataChanged = useCallback(() => {
    return JSON.stringify(data) !== JSON.stringify(lastDataRef.current);
  }, [data]);

  // Save function with retry logic
  const performSave = useCallback(async () => {
    if (!enabled || state.isSaving) return;

    setState(prev => ({ ...prev, isSaving: true, saveError: null }));
    onSaveStart?.();

    try {
      await retry(
        () => saveFunction(data),
        {
          maxAttempts: retryOptions.maxAttempts,
          delay: retryOptions.delay,
          shouldRetry: (error) => {
            // Retry on network errors and temporary failures
            return error.name === 'NetworkError' || 
                   error.message.includes('timeout') ||
                   error.message.includes('fetch');
          }
        }
      );

      const now = new Date();
      setState(prev => ({
        ...prev,
        isSaving: false,
        lastSaved: now,
        hasUnsavedChanges: false,
        saveError: null
      }));

      lastDataRef.current = data;
      saveCountRef.current += 1;
      
      onSaveSuccess?.();
      
      if (showToasts) {
        toast.success('Changes saved automatically', {
          duration: 2000
        });
      }
    } catch (error) {
      const saveError = error instanceof Error ? error : new Error(String(error));
      
      setState(prev => ({
        ...prev,
        isSaving: false,
        saveError
      }));
      
      onSaveError?.(saveError);
      
      if (showToasts) {
        toast.error('Failed to save changes', {
          title: 'Auto-save Error',
          action: {
            label: 'Retry',
            onClick: () => performSave()
          },
          duration: 0 // Don't auto-dismiss error toasts
        });
      }
    }
  }, [data, enabled, saveFunction, onSaveStart, onSaveSuccess, onSaveError, showToasts, retryOptions, state.isSaving, toast]);

  // Manual save function
  const saveNow = useCallback(async () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
    await performSave();
  }, [performSave]);

  // Auto-save effect
  useEffect(() => {
    if (!enabled || !hasDataChanged()) return;

    setState(prev => ({ ...prev, hasUnsavedChanges: true }));

    // Clear existing timeout
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    // Set new timeout
    timeoutRef.current = setTimeout(() => {
      performSave();
    }, delay);

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [data, enabled, delay, hasDataChanged, performSave]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  // Save on page unload if there are unsaved changes
  useEffect(() => {
    const handleBeforeUnload = (event: BeforeUnloadEvent) => {
      if (state.hasUnsavedChanges) {
        event.preventDefault();
        event.returnValue = 'You have unsaved changes. Are you sure you want to leave?';
        return event.returnValue;
      }
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
    
    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, [state.hasUnsavedChanges]);

  // Restore data from localStorage on mount
  useEffect(() => {
    const savedData = localStorage.getItem(`autosave-${key}`);
    if (savedData) {
      try {
        const parsed = JSON.parse(savedData);
        // You might want to emit this data to parent component
        // This is just for backup purposes
      } catch (error) {
        console.warn('Failed to parse saved data:', error);
      }
    }
  }, [key]);

  // Save to localStorage as backup
  useEffect(() => {
    if (state.hasUnsavedChanges) {
      localStorage.setItem(`autosave-${key}`, JSON.stringify(data));
    }
  }, [key, data, state.hasUnsavedChanges]);

  return {
    ...state,
    saveNow,
    saveCount: saveCountRef.current
  };
};