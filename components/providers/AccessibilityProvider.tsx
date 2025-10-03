/**
 * Accessibility Provider Component
 * Manages accessibility features and preferences across the application
 */

'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import { useAccessibility, useSkipLinks } from '../../lib/hooks/useAccessibility';
import { validateDesignSystemContrast } from '../../lib/utils/accessibility';

interface AccessibilityContextType {
  preferences: {
    prefersReducedMotion: boolean;
    prefersHighContrast: boolean;
    keyboardNavigation: boolean;
  };
  announceToScreenReader: (message: string, priority?: 'polite' | 'assertive') => void;
  trapFocus: (container: Element) => () => void;
  restoreFocus: (element: HTMLElement | null) => void;
  contrastValidation: {
    valid: boolean;
    results: Array<{
      combination: string;
      ratio: number;
      meetsAA: boolean;
      meetsAAA: boolean;
    }>;
  };
}

const AccessibilityContext = createContext<AccessibilityContextType | undefined>(undefined);

export function useAccessibilityContext() {
  const context = useContext(AccessibilityContext);
  if (context === undefined) {
    throw new Error('useAccessibilityContext must be used within an AccessibilityProvider');
  }
  return context;
}

interface AccessibilityProviderProps {
  children: React.ReactNode;
  skipLinks?: Array<{ href: string; label: string }>;
  enableContrastValidation?: boolean;
}

export function AccessibilityProvider({ 
  children, 
  skipLinks = [
    { href: '#main-content', label: 'Skip to main content' },
    { href: '#main-navigation', label: 'Skip to navigation' },
    { href: '#footer', label: 'Skip to footer' },
  ],
  enableContrastValidation = process.env.NODE_ENV === 'development'
}: AccessibilityProviderProps) {
  const { preferences, announceToScreenReader, trapFocus, restoreFocus } = useAccessibility();
  const [contrastValidation, setContrastValidation] = useState({
    valid: true,
    results: [],
  });

  // Set up skip links
  useSkipLinks(skipLinks);

  // Validate color contrast on mount (development only)
  useEffect(() => {
    if (enableContrastValidation) {
      const validation = validateDesignSystemContrast();
      setContrastValidation(validation);

      // Log contrast issues in development
      if (!validation.valid) {
        console.warn('Color contrast issues detected:', validation.results.filter(r => !r.meetsAA));
      }
    }
  }, [enableContrastValidation]);

  // Apply accessibility classes to document
  useEffect(() => {
    const html = document.documentElement;
    const body = document.body;

    // Apply reduced motion class
    if (preferences.prefersReducedMotion) {
      html.classList.add('motion-reduce');
      body.classList.add('motion-reduce');
    } else {
      html.classList.remove('motion-reduce');
      body.classList.remove('motion-reduce');
    }

    // Apply high contrast class
    if (preferences.prefersHighContrast) {
      html.classList.add('high-contrast');
      body.classList.add('high-contrast');
    } else {
      html.classList.remove('high-contrast');
      body.classList.remove('high-contrast');
    }

    // Apply keyboard navigation class
    if (preferences.keyboardNavigation) {
      body.classList.add('keyboard-navigation-active');
      body.classList.remove('mouse-navigation-active');
    } else {
      body.classList.add('mouse-navigation-active');
      body.classList.remove('keyboard-navigation-active');
    }
  }, [preferences]);

  // Set up global keyboard event listeners
  useEffect(() => {
    const handleEscapeKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        // Close any open modals or overlays
        const openModals = document.querySelectorAll('[role="dialog"][aria-hidden="false"]');
        openModals.forEach(modal => {
          const closeButton = modal.querySelector('[aria-label*="close"], [aria-label*="Close"]');
          if (closeButton instanceof HTMLElement) {
            closeButton.click();
          }
        });
      }
    };

    document.addEventListener('keydown', handleEscapeKey);

    return () => {
      document.removeEventListener('keydown', handleEscapeKey);
    };
  }, []);

  // Announce route changes to screen readers
  useEffect(() => {
    const handleRouteChange = () => {
      // Get the main heading of the new page
      const mainHeading = document.querySelector('h1');
      if (mainHeading) {
        const pageTitle = mainHeading.textContent || document.title;
        announceToScreenReader(`Navigated to ${pageTitle}`, 'polite');
      }
    };

    // Listen for navigation events (this would need to be adapted based on your routing solution)
    window.addEventListener('popstate', handleRouteChange);

    return () => {
      window.removeEventListener('popstate', handleRouteChange);
    };
  }, [announceToScreenReader]);

  const contextValue: AccessibilityContextType = {
    preferences,
    announceToScreenReader,
    trapFocus,
    restoreFocus,
    contrastValidation,
  };

  return (
    <AccessibilityContext.Provider value={contextValue}>
      {children}
      {/* Live region for announcements */}
      <div
        id="accessibility-announcements"
        aria-live="polite"
        aria-atomic="true"
        className="sr-only"
      />
      {/* Development-only contrast validation display */}
      {enableContrastValidation && !contrastValidation.valid && (
        <div
          style={{
            position: 'fixed',
            bottom: '20px',
            right: '20px',
            background: '#ff0000',
            color: '#ffffff',
            padding: '10px',
            borderRadius: '4px',
            fontSize: '12px',
            zIndex: 9999,
            maxWidth: '300px',
          }}
        >
          <strong>Accessibility Warning:</strong> Color contrast issues detected.
          Check console for details.
        </div>
      )}
    </AccessibilityContext.Provider>
  );
}

/**
 * Higher-order component to add accessibility features to any component
 */
export function withAccessibility<P extends object>(
  Component: React.ComponentType<P>
) {
  return function AccessibilityEnhancedComponent(props: P) {
    const accessibility = useAccessibilityContext();

    return (
      <Component
        {...props}
        accessibility={accessibility}
      />
    );
  };
}

/**
 * Hook to get accessibility context (alternative to useAccessibilityContext)
 */
export function useA11y() {
  return useAccessibilityContext();
}