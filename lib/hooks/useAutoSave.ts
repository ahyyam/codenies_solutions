// Auto-save functionality hook
import { useEffect, useCallback, useRef, useState } from 'react';
import { useDebounce } from './useDebounce';
import { AppErrorHandler } from '../utils/error-handling';
import { AppError } from '../types/validation';

interface UseAutoSaveOptions<T> {
  data: T;
  saveFunction: (data: T) => Promise<void>;
  interval?: number; // milliseconds
  enabled?: boolean;
  debounceMs?: number;
  onSaveSuccess?: (data: T) => void;
  onSaveError?: (error: AppError, data: T) => void;
}

interface AutoSaveState {
  lastSaved: Date | null;
  isSaving: boolean;
  saveCount: number;
  lastError: AppError | null;
}

export function useAutoSave<T>(options: UseAutoSaveOptions<T>) {
  const {
    data,
    saveFunction,
    interval = 30000, // 30 seconds default
    enabled = true,
    debounceMs = 2000, // 2 seconds debounce
    onSaveSuccess,
    onSaveError
  } = options;

  const [state, setState] = useState<AutoSaveState>({
    lastSaved: null,
    isSaving: false,
    saveCount: 0,
    lastError: null
  });

  const debouncedData = useDebounce(data, debounceMs);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const lastDataRef = useRef<T>(data);

  // Save function with error handling
  const performSave = useCallback(async (dataToSave: T) => {
    if (!enabled) return;

    setState(prev => ({ ...prev, isSaving: true, lastError: null }));

    try {
      await saveFunction(dataToSave);
      
      setState(prev => ({
        ...prev,
        isSaving: false,
        lastSaved: new Date(),
        saveCount: prev.saveCount + 1,
        lastError: null
      }));

      onSaveSuccess?.(dataToSave);
      lastDataRef.current = dataToSave;
    } catch (error) {
      const appError = AppErrorHandler.createError(
        'AUTO_SAVE_ERROR',
        `Auto-save failed: ${error instanceof Error ? error.message : 'Unknown error'}`,
        { data: dataToSave, error }
      );

      setState(prev => ({
        ...prev,
        isSaving: false,
        lastError: appError
      }));

      onSaveError?.(appError, dataToSave);
    }
  }, [enabled, saveFunction, onSaveSuccess, onSaveError]);

  // Manual save function
  const saveNow = useCallback(async () => {
    await performSave(data);
  }, [performSave, data]);

  // Check if data has changed
  const hasChanges = useCallback((currentData: T, lastData: T): boolean => {
    try {
      return JSON.stringify(currentData) !== JSON.stringify(lastData);
    } catch {
      // Fallback to reference comparison if JSON.stringify fails
      return currentData !== lastData;
    }
  }, []);

  // Auto-save on data changes (debounced)
  useEffect(() => {
    if (!enabled) return;

    if (hasChanges(debouncedData, lastDataRef.current)) {
      performSave(debouncedData);
    }
  }, [debouncedData, enabled, hasChanges, performSave]);

  // Periodic auto-save
  useEffect(() => {
    if (!enabled || interval <= 0) return;

    intervalRef.current = setInterval(() => {
      if (hasChanges(data, lastDataRef.current)) {
        performSave(data);
      }
    }, interval);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [data, enabled, interval, hasChanges, performSave]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);

  // Save on page unload
  useEffect(() => {
    if (!enabled) return;

    const handleBeforeUnload = (event: BeforeUnloadEvent) => {
      if (hasChanges(data, lastDataRef.current)) {
        // Attempt synchronous save (limited browser support)
        try {
          // Use sendBeacon for better reliability
          if (navigator.sendBeacon) {
            const blob = new Blob([JSON.stringify(data)], { type: 'application/json' });
            navigator.sendBeacon('/api/auto-save', blob);
          }
        } catch (error) {
          console.warn('Failed to save on page unload:', error);
        }

        // Show confirmation dialog
        event.preventDefault();
        event.returnValue = 'You have unsaved changes. Are you sure you want to leave?';
        return event.returnValue;
      }
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
    
    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, [data, enabled, hasChanges]);

  // Get time since last save
  const timeSinceLastSave = useCallback((): number | null => {
    if (!state.lastSaved) return null;
    return Date.now() - state.lastSaved.getTime();
  }, [state.lastSaved]);

  // Format time since last save
  const formatTimeSinceLastSave = useCallback((): string => {
    const time = timeSinceLastSave();
    if (time === null) return 'Never saved';

    const seconds = Math.floor(time / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);

    if (hours > 0) return `${hours}h ${minutes % 60}m ago`;
    if (minutes > 0) return `${minutes}m ${seconds % 60}s ago`;
    return `${seconds}s ago`;
  }, [timeSinceLastSave]);

  // Check if there are unsaved changes
  const hasUnsavedChanges = hasChanges(data, lastDataRef.current);

  return {
    // State
    ...state,
    hasUnsavedChanges,
    enabled,
    
    // Actions
    saveNow,
    
    // Utilities
    timeSinceLastSave,
    formatTimeSinceLastSave,
    
    // Status helpers
    canSave: enabled && !state.isSaving,
    shouldShowSaveIndicator: state.isSaving || hasUnsavedChanges,
    saveStatus: state.isSaving 
      ? 'Saving...' 
      : hasUnsavedChanges 
        ? 'Unsaved changes' 
        : state.lastSaved 
          ? `Saved ${formatTimeSinceLastSave()}` 
          : 'Not saved'
  };
}