import React from 'react';

// ARIA utilities
export const generateId = (prefix: string = 'element'): string => {
  return `${prefix}-${Math.random().toString(36).substr(2, 9)}`;
};

export const createAriaDescribedBy = (ids: (string | undefined)[]): string | undefined => {
  const validIds = ids.filter(Boolean);
  return validIds.length > 0 ? validIds.join(' ') : undefined;
};

// Focus management utilities
export const trapFocus = (element: HTMLElement): (() => void) => {
  const focusableElements = element.querySelectorAll(
    'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
  ) as NodeListOf<HTMLElement>;
  
  const firstElement = focusableElements[0];
  const lastElement = focusableElements[focusableElements.length - 1];

  const handleTabKey = (e: KeyboardEvent) => {
    if (e.key !== 'Tab') return;

    if (e.shiftKey) {
      if (document.activeElement === firstElement) {
        lastElement.focus();
        e.preventDefault();
      }
    } else {
      if (document.activeElement === lastElement) {
        firstElement.focus();
        e.preventDefault();
      }
    }
  };

  element.addEventListener('keydown', handleTabKey);
  
  // Focus first element
  firstElement?.focus();

  // Return cleanup function
  return () => {
    element.removeEventListener('keydown', handleTabKey);
  };
};

export const restoreFocus = (previousActiveElement: Element | null) => {
  if (previousActiveElement && 'focus' in previousActiveElement) {
    (previousActiveElement as HTMLElement).focus();
  }
};

// Keyboard navigation utilities
export const handleKeyboardNavigation = (
  e: React.KeyboardEvent,
  handlers: {
    onEnter?: () => void;
    onSpace?: () => void;
    onEscape?: () => void;
    onArrowUp?: () => void;
    onArrowDown?: () => void;
    onArrowLeft?: () => void;
    onArrowRight?: () => void;
    onHome?: () => void;
    onEnd?: () => void;
  }
) => {
  const { key } = e;
  
  switch (key) {
    case 'Enter':
      handlers.onEnter?.();
      break;
    case ' ':
      handlers.onSpace?.();
      e.preventDefault(); // Prevent page scroll
      break;
    case 'Escape':
      handlers.onEscape?.();
      break;
    case 'ArrowUp':
      handlers.onArrowUp?.();
      e.preventDefault();
      break;
    case 'ArrowDown':
      handlers.onArrowDown?.();
      e.preventDefault();
      break;
    case 'ArrowLeft':
      handlers.onArrowLeft?.();
      e.preventDefault();
      break;
    case 'ArrowRight':
      handlers.onArrowRight?.();
      e.preventDefault();
      break;
    case 'Home':
      handlers.onHome?.();
      e.preventDefault();
      break;
    case 'End':
      handlers.onEnd?.();
      e.preventDefault();
      break;
  }
};

// Screen reader utilities
export const announceToScreenReader = (message: string, priority: 'polite' | 'assertive' = 'polite') => {
  const announcement = document.createElement('div');
  announcement.setAttribute('aria-live', priority);
  announcement.setAttribute('aria-atomic', 'true');
  announcement.className = 'sr-only';
  announcement.textContent = message;
  
  document.body.appendChild(announcement);
  
  // Remove after announcement
  setTimeout(() => {
    document.body.removeChild(announcement);
  }, 1000);
};

// Color contrast utilities
export const getContrastRatio = (color1: string, color2: string): number => {
  const getLuminance = (color: string): number => {
    // Simple luminance calculation for hex colors
    const hex = color.replace('#', '');
    const r = parseInt(hex.substr(0, 2), 16) / 255;
    const g = parseInt(hex.substr(2, 2), 16) / 255;
    const b = parseInt(hex.substr(4, 2), 16) / 255;
    
    const sRGB = [r, g, b].map(c => {
      return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
    });
    
    return 0.2126 * sRGB[0] + 0.7152 * sRGB[1] + 0.0722 * sRGB[2];
  };
  
  const lum1 = getLuminance(color1);
  const lum2 = getLuminance(color2);
  const brightest = Math.max(lum1, lum2);
  const darkest = Math.min(lum1, lum2);
  
  return (brightest + 0.05) / (darkest + 0.05);
};

export const meetsWCAGContrast = (color1: string, color2: string, level: 'AA' | 'AAA' = 'AA'): boolean => {
  const ratio = getContrastRatio(color1, color2);
  return level === 'AA' ? ratio >= 4.5 : ratio >= 7;
};

// React hooks for accessibility
export const useFocusTrap = (isActive: boolean) => {
  const elementRef = React.useRef<HTMLElement>(null);
  
  React.useEffect(() => {
    if (!isActive || !elementRef.current) return;
    
    const cleanup = trapFocus(elementRef.current);
    return cleanup;
  }, [isActive]);
  
  return elementRef;
};

export const useFocusRestore = () => {
  const previousActiveElementRef = React.useRef<Element | null>(null);
  
  const saveFocus = React.useCallback(() => {
    previousActiveElementRef.current = document.activeElement;
  }, []);
  
  const restoreFocusCallback = React.useCallback(() => {
    restoreFocus(previousActiveElementRef.current);
  }, []);
  
  return { saveFocus, restoreFocus: restoreFocusCallback };
};

export const useAnnouncement = () => {
  const announce = React.useCallback((message: string, priority: 'polite' | 'assertive' = 'polite') => {
    announceToScreenReader(message, priority);
  }, []);
  
  return announce;
};

export const useKeyboardNavigation = (handlers: Parameters<typeof handleKeyboardNavigation>[1]) => {
  const handleKeyDown = React.useCallback((e: React.KeyboardEvent) => {
    handleKeyboardNavigation(e, handlers);
  }, [handlers]);
  
  return handleKeyDown;
};

// Accessibility validation utilities
export const validateAccessibility = (element: HTMLElement): string[] => {
  const issues: string[] = [];
  
  // Check for missing alt text on images
  const images = element.querySelectorAll('img');
  images.forEach((img, index) => {
    if (!img.alt && !img.getAttribute('aria-label')) {
      issues.push(`Image ${index + 1} is missing alt text`);
    }
  });
  
  // Check for missing labels on form controls
  const formControls = element.querySelectorAll('input, select, textarea');
  formControls.forEach((control, index) => {
    const hasLabel = control.getAttribute('aria-label') || 
                    control.getAttribute('aria-labelledby') ||
                    element.querySelector(`label[for="${control.id}"]`);
    
    if (!hasLabel) {
      issues.push(`Form control ${index + 1} is missing a label`);
    }
  });
  
  // Check for missing headings hierarchy
  const headings = element.querySelectorAll('h1, h2, h3, h4, h5, h6');
  let previousLevel = 0;
  headings.forEach((heading, index) => {
    const level = parseInt(heading.tagName.charAt(1));
    if (index === 0 && level !== 1) {
      issues.push('Page should start with an h1 heading');
    }
    if (level > previousLevel + 1) {
      issues.push(`Heading level ${level} skips levels (previous was ${previousLevel})`);
    }
    previousLevel = level;
  });
  
  // Check for interactive elements without proper roles
  const interactiveElements = element.querySelectorAll('[onclick], [onkeydown]');
  interactiveElements.forEach((el, index) => {
    if (!el.getAttribute('role') && !['button', 'a', 'input', 'select', 'textarea'].includes(el.tagName.toLowerCase())) {
      issues.push(`Interactive element ${index + 1} should have a proper role`);
    }
  });
  
  return issues;
};