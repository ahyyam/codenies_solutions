import React, { ReactNode } from 'react';
import { ToastProvider } from '@/lib/contexts/ToastContext';
import { ErrorBoundary } from '@/components/organisms/ErrorBoundary';
import { ToastContainer } from '@/components/organisms/ToastContainer';
import { AccessibilityProvider } from './AccessibilityProvider';
import { setupGlobalErrorHandling } from '@/lib/utils/error-handling-enhanced';

export interface AppProvidersProps {
  children: ReactNode;
}

// Setup global error handling on module load
if (typeof window !== 'undefined') {
  setupGlobalErrorHandling();
}

export const AppProviders: React.FC<AppProvidersProps> = ({ children }) => {
  return (
    <ErrorBoundary
      showDetails={process.env.NODE_ENV === 'development'}
      onError={(error, errorInfo) => {
        // Log error to external service in production
        if (process.env.NODE_ENV === 'production') {
          // Example: logErrorToService(error, errorInfo);
        }
      }}
    >
      <AccessibilityProvider>
        <ToastProvider>
          {children}
          <ToastContainer position="top-right" />
        </ToastProvider>
      </AccessibilityProvider>
    </ErrorBoundary>
  );
};