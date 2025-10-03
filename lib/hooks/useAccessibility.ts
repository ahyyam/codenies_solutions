/**
 * React hook for managing accessibility features and preferences
 */

import { useEffect, useState, useCallback } from 'react';
import { 
  FocusManager, 
  MotionPreferences, 
  HighContrastMode, 
  ScreenReaderUtils 
} from '../utils/accessibility';

export interface AccessibilityPreferences {
  prefersReducedMotion: boolean;
  prefersHighContrast: boolean;
  keyboardNavigation: boolean;
}

export function useAccessibility() {
  const [preferences, setPreferences] = useState<AccessibilityPreferences>({
    prefersReducedMotion: false,
    prefersHighContrast: false,
    keyboardNavigation: false,
  });

  // Initialize preferences on mount
  useEffect(() => {
    setPreferences({
      prefersReducedMotion: MotionPreferences.prefersReducedMotion(),
      prefersHighContrast: HighContrastMode.prefersHighContrast(),
      keyboardNavigation: false,
    });
  }, []);

  // Listen for preference changes
  useEffect(() => {
    const cleanupMotion = MotionPreferences.onMotionPreferenceChange((prefersReduced) => {
      setPreferences(prev => ({ ...prev, prefersReducedMotion: prefersReduced }));
    });

    const cleanupContrast = HighContrastMode.onContrastPreferenceChange((prefersHigh) => {
      setPreferences(prev => ({ ...prev, prefersHighContrast: prefersHigh }));
    });

    return () => {
      cleanupMotion();
      cleanupContrast();
    };
  }, []);

  // Detect keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Tab') {
        setPreferences(prev => ({ ...prev, keyboardNavigation: true }));
        document.body.classList.add('keyboard-navigation-active');
        document.body.classList.remove('mouse-navigation-active');
      }
    };

    const handleMouseDown = () => {
      setPreferences(prev => ({ ...prev, keyboardNavigation: false }));
      document.body.classList.add('mouse-navigation-active');
      document.body.classList.remove('keyboard-navigation-active');
    };

    document.addEventListener('keydown', handleKeyDown);
    document.addEventListener('mousedown', handleMouseDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('mousedown', handleMouseDown);
    };
  }, []);

  // Apply accessibility classes to body
  useEffect(() => {
    const body = document.body;
    
    if (preferences.prefersReducedMotion) {
      body.classList.add('motion-reduce');
    } else {
      body.classList.remove('motion-reduce');
    }

    if (preferences.prefersHighContrast) {
      body.classList.add('high-contrast');
    } else {
      body.classList.remove('high-contrast');
    }
  }, [preferences]);

  const announceToScreenReader = useCallback((message: string, priority: 'polite' | 'assertive' = 'polite') => {
    ScreenReaderUtils.announce(message, priority);
  }, []);

  const trapFocus = useCallback((container: Element) => {
    return FocusManager.trapFocus(container);
  }, []);

  const restoreFocus = useCallback((element: HTMLElement | null) => {
    FocusManager.restoreFocus(element);
  }, []);

  return {
    preferences,
    announceToScreenReader,
    trapFocus,
    restoreFocus,
  };
}

/**
 * Hook for managing focus trap in modals and overlays
 */
export function useFocusTrap(isActive: boolean, containerRef: React.RefObject<HTMLElement>) {
  const [previouslyFocusedElement, setPreviouslyFocusedElement] = useState<HTMLElement | null>(null);

  useEffect(() => {
    if (!isActive || !containerRef.current) return;

    // Store the currently focused element
    setPreviouslyFocusedElement(document.activeElement as HTMLElement);

    // Trap focus within the container
    const cleanup = FocusManager.trapFocus(containerRef.current);

    return () => {
      cleanup();
      // Restore focus to the previously focused element
      if (previouslyFocusedElement) {
        FocusManager.restoreFocus(previouslyFocusedElement);
      }
    };
  }, [isActive, containerRef, previouslyFocusedElement]);
}

/**
 * Hook for managing keyboard navigation in lists
 */
export function useKeyboardNavigation(
  itemsRef: React.RefObject<HTMLElement[]>,
  isActive: boolean = true
) {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (!isActive || !itemsRef.current) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      const items = itemsRef.current;
      if (!items || items.length === 0) return;

      let newIndex = currentIndex;

      switch (e.key) {
        case 'ArrowDown':
        case 'ArrowRight':
          e.preventDefault();
          newIndex = (currentIndex + 1) % items.length;
          break;
        case 'ArrowUp':
        case 'ArrowLeft':
          e.preventDefault();
          newIndex = currentIndex === 0 ? items.length - 1 : currentIndex - 1;
          break;
        case 'Home':
          e.preventDefault();
          newIndex = 0;
          break;
        case 'End':
          e.preventDefault();
          newIndex = items.length - 1;
          break;
        default:
          return;
      }

      setCurrentIndex(newIndex);
      items[newIndex]?.focus();
    };

    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [currentIndex, isActive, itemsRef]);

  return { currentIndex, setCurrentIndex };
}

/**
 * Hook for managing ARIA live regions
 */
export function useAriaLiveRegion() {
  const [liveRegion, setLiveRegion] = useState<HTMLDivElement | null>(null);

  useEffect(() => {
    // Create live region on mount
    const region = document.createElement('div');
    region.setAttribute('aria-live', 'polite');
    region.setAttribute('aria-atomic', 'true');
    region.className = 'sr-only';
    document.body.appendChild(region);
    setLiveRegion(region);

    return () => {
      // Cleanup on unmount
      if (document.body.contains(region)) {
        document.body.removeChild(region);
      }
    };
  }, []);

  const announce = useCallback((message: string, priority: 'polite' | 'assertive' = 'polite') => {
    if (liveRegion) {
      liveRegion.setAttribute('aria-live', priority);
      liveRegion.textContent = message;
      
      // Clear after announcement
      setTimeout(() => {
        liveRegion.textContent = '';
      }, 1000);
    }
  }, [liveRegion]);

  return { announce };
}

/**
 * Hook for managing skip links
 */
export function useSkipLinks(links: Array<{ href: string; label: string }>) {
  useEffect(() => {
    // Create skip links container
    const skipLinksContainer = document.createElement('div');
    skipLinksContainer.className = 'skip-links';
    skipLinksContainer.setAttribute('role', 'navigation');
    skipLinksContainer.setAttribute('aria-label', 'Skip links');

    links.forEach(({ href, label }) => {
      const link = document.createElement('a');
      link.href = href;
      link.className = 'skip-link';
      link.textContent = label;
      skipLinksContainer.appendChild(link);
    });

    // Insert at the beginning of the body
    document.body.insertBefore(skipLinksContainer, document.body.firstChild);

    return () => {
      // Cleanup on unmount
      if (document.body.contains(skipLinksContainer)) {
        document.body.removeChild(skipLinksContainer);
      }
    };
  }, [links]);
}

/**
 * Hook for managing color contrast validation
 */
export function useColorContrastValidation() {
  const [contrastIssues, setContrastIssues] = useState<string[]>([]);

  const validateContrast = useCallback((element: Element) => {
    if (process.env.NODE_ENV !== 'development') return;

    const issues: string[] = [];
    const computedStyle = window.getComputedStyle(element);
    const color = computedStyle.color;
    const backgroundColor = computedStyle.backgroundColor;

    // This is a simplified check - in a real implementation,
    // you would need to parse the computed colors and check contrast ratios
    if (color && backgroundColor) {
      // Add validation logic here
      console.log('Validating contrast for:', { color, backgroundColor });
    }

    setContrastIssues(issues);
  }, []);

  return { contrastIssues, validateContrast };
}