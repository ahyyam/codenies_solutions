import React, { createContext, useContext, useState, useCallback, ReactNode } from 'react';
import { ToastProps } from '@/components/atoms/Toast';

export interface ToastContextType {
  toasts: ToastProps[];
  addToast: (toast: Omit<ToastProps, 'id' | 'onDismiss'>) => string;
  removeToast: (id: string) => void;
  clearToasts: () => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export interface ToastProviderProps {
  children: ReactNode;
}

export const ToastProvider: React.FC<ToastProviderProps> = ({ children }) => {
  const [toasts, setToasts] = useState<ToastProps[]>([]);

  const addToast = useCallback((toast: Omit<ToastProps, 'id' | 'onDismiss'>) => {
    const id = `toast-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    const newToast: ToastProps = {
      ...toast,
      id,
      onDismiss: removeToast
    };

    setToasts(prev => [...prev, newToast]);
    return id;
  }, []);

  const removeToast = useCallback((id: string) => {
    setToasts(prev => prev.filter(toast => toast.id !== id));
  }, []);

  const clearToasts = useCallback(() => {
    setToasts([]);
  }, []);

  const value: ToastContextType = {
    toasts,
    addToast,
    removeToast,
    clearToasts
  };

  return (
    <ToastContext.Provider value={value}>
      {children}
    </ToastContext.Provider>
  );
};

export const useToast = (): ToastContextType => {
  const context = useContext(ToastContext);
  if (context === undefined) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
};

// Convenience hooks for different toast types
export const useToastActions = () => {
  const { addToast } = useToast();

  return {
    success: (message: string, options?: Partial<Omit<ToastProps, 'id' | 'message' | 'type' | 'onDismiss'>>) =>
      addToast({ ...options, message, type: 'success' }),
    
    error: (message: string, options?: Partial<Omit<ToastProps, 'id' | 'message' | 'type' | 'onDismiss'>>) =>
      addToast({ ...options, message, type: 'error' }),
    
    warning: (message: string, options?: Partial<Omit<ToastProps, 'id' | 'message' | 'type' | 'onDismiss'>>) =>
      addToast({ ...options, message, type: 'warning' }),
    
    info: (message: string, options?: Partial<Omit<ToastProps, 'id' | 'message' | 'type' | 'onDismiss'>>) =>
      addToast({ ...options, message, type: 'info' })
  };
};