import { validateAccessibility } from './accessibility';

export interface AccessibilityTestResult {
  passed: boolean;
  issues: AccessibilityIssue[];
  score: number;
  recommendations: string[];
}

export interface AccessibilityIssue {
  type: 'error' | 'warning' | 'info';
  message: string;
  element?: HTMLElement;
  rule: string;
  impact: 'critical' | 'serious' | 'moderate' | 'minor';
}

export class AccessibilityTester {
  private static instance: AccessibilityTester;

  static getInstance(): AccessibilityTester {
    if (!AccessibilityTester.instance) {
      AccessibilityTester.instance = new AccessibilityTester();
    }
    return AccessibilityTester.instance;
  }

  async testElement(element: HTMLElement): Promise<AccessibilityTestResult> {
    const issues: AccessibilityIssue[] = [];
    
    // Run basic validation
    const basicIssues = validateAccessibility(element);
    basicIssues.forEach(message => {
      issues.push({
        type: 'error',
        message,
        rule: 'basic-validation',
        impact: 'serious'
      });
    });

    // Test color contrast
    await this.testColorContrast(element, issues);
    
    // Test keyboard navigation
    this.testKeyboardNavigation(element, issues);
    
    // Test ARIA usage
    this.testAriaUsage(element, issues);
    
    // Test semantic structure
    this.testSemanticStructure(element, issues);
    
    // Test focus management
    this.testFocusManagement(element, issues);

    // Calculate score
    const score = this.calculateScore(issues);
    
    // Generate recommendations
    const recommendations = this.generateRecommendations(issues);

    return {
      passed: issues.filter(issue => issue.type === 'error').length === 0,
      issues,
      score,
      recommendations
    };
  }

  private async testColorContrast(element: HTMLElement, issues: AccessibilityIssue[]): Promise<void> {
    const textElements = element.querySelectorAll('*');
    
    textElements.forEach((el) => {
      const styles = window.getComputedStyle(el);
      const color = styles.color;
      const backgroundColor = styles.backgroundColor;
      
      // Skip if no text content or transparent background
      if (!el.textContent?.trim() || backgroundColor === 'rgba(0, 0, 0, 0)') {
        return;
      }

      try {
        // Simple contrast check (would need more sophisticated implementation)
        const hasGoodContrast = this.checkContrast(color, backgroundColor);
        
        if (!hasGoodContrast) {
          issues.push({
            type: 'error',
            message: `Insufficient color contrast detected`,
            element: el as HTMLElement,
            rule: 'color-contrast',
            impact: 'serious'
          });
        }
      } catch (error) {
        // Skip elements where contrast can't be determined
      }
    });
  }

  private testKeyboardNavigation(element: HTMLElement, issues: AccessibilityIssue[]): void {
    const interactiveElements = element.querySelectorAll(
      'button, a, input, select, textarea, [tabindex], [role="button"], [role="link"]'
    );

    interactiveElements.forEach((el) => {
      const tabIndex = el.getAttribute('tabindex');
      
      // Check for positive tabindex (anti-pattern)
      if (tabIndex && parseInt(tabIndex) > 0) {
        issues.push({
          type: 'warning',
          message: 'Avoid positive tabindex values',
          element: el as HTMLElement,
          rule: 'tabindex-positive',
          impact: 'moderate'
        });
      }

      // Check for missing focus indicators
      const styles = window.getComputedStyle(el, ':focus');
      if (!styles.outline && !styles.boxShadow && !styles.border) {
        issues.push({
          type: 'error',
          message: 'Interactive element lacks visible focus indicator',
          element: el as HTMLElement,
          rule: 'focus-indicator',
          impact: 'serious'
        });
      }
    });
  }

  private testAriaUsage(element: HTMLElement, issues: AccessibilityIssue[]): void {
    const elementsWithAria = element.querySelectorAll('[aria-label], [aria-labelledby], [aria-describedby], [role]');

    elementsWithAria.forEach((el) => {
      // Check aria-labelledby references
      const labelledBy = el.getAttribute('aria-labelledby');
      if (labelledBy) {
        const referencedElements = labelledBy.split(' ').map(id => document.getElementById(id));
        if (referencedElements.some(ref => !ref)) {
          issues.push({
            type: 'error',
            message: 'aria-labelledby references non-existent element',
            element: el as HTMLElement,
            rule: 'aria-labelledby-valid',
            impact: 'serious'
          });
        }
      }

      // Check aria-describedby references
      const describedBy = el.getAttribute('aria-describedby');
      if (describedBy) {
        const referencedElements = describedBy.split(' ').map(id => document.getElementById(id));
        if (referencedElements.some(ref => !ref)) {
          issues.push({
            type: 'error',
            message: 'aria-describedby references non-existent element',
            element: el as HTMLElement,
            rule: 'aria-describedby-valid',
            impact: 'serious'
          });
        }
      }

      // Check for redundant ARIA
      const role = el.getAttribute('role');
      const tagName = el.tagName.toLowerCase();
      if (role === 'button' && tagName === 'button') {
        issues.push({
          type: 'info',
          message: 'Redundant role attribute on button element',
          element: el as HTMLElement,
          rule: 'aria-redundant',
          impact: 'minor'
        });
      }
    });
  }

  private testSemanticStructure(element: HTMLElement, issues: AccessibilityIssue[]): void {
    // Check heading hierarchy
    const headings = element.querySelectorAll('h1, h2, h3, h4, h5, h6');
    let previousLevel = 0;
    
    headings.forEach((heading, index) => {
      const level = parseInt(heading.tagName.charAt(1));
      
      if (index === 0 && level !== 1) {
        issues.push({
          type: 'warning',
          message: 'Page should start with h1',
          element: heading as HTMLElement,
          rule: 'heading-hierarchy',
          impact: 'moderate'
        });
      }
      
      if (level > previousLevel + 1) {
        issues.push({
          type: 'error',
          message: `Heading level ${level} skips levels`,
          element: heading as HTMLElement,
          rule: 'heading-hierarchy',
          impact: 'serious'
        });
      }
      
      previousLevel = level;
    });

    // Check for landmark roles
    const landmarks = element.querySelectorAll('main, nav, aside, header, footer, [role="main"], [role="navigation"], [role="complementary"], [role="banner"], [role="contentinfo"]');
    if (landmarks.length === 0) {
      issues.push({
        type: 'warning',
        message: 'Page lacks landmark elements for navigation',
        rule: 'landmarks',
        impact: 'moderate'
      });
    }
  }

  private testFocusManagement(element: HTMLElement, issues: AccessibilityIssue[]): void {
    // Check for focus traps in modals
    const modals = element.querySelectorAll('[role="dialog"], [aria-modal="true"]');
    modals.forEach((modal) => {
      const focusableElements = modal.querySelectorAll(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      );
      
      if (focusableElements.length === 0) {
        issues.push({
          type: 'error',
          message: 'Modal lacks focusable elements',
          element: modal as HTMLElement,
          rule: 'modal-focus',
          impact: 'critical'
        });
      }
    });
  }

  private checkContrast(color: string, backgroundColor: string): boolean {
    // Simplified contrast check - in real implementation, would use proper color parsing
    // and WCAG contrast ratio calculation
    return true; // Placeholder
  }

  private calculateScore(issues: AccessibilityIssue[]): number {
    const weights = {
      critical: 25,
      serious: 10,
      moderate: 5,
      minor: 1
    };

    const totalDeductions = issues.reduce((sum, issue) => {
      return sum + weights[issue.impact];
    }, 0);

    return Math.max(0, 100 - totalDeductions);
  }

  private generateRecommendations(issues: AccessibilityIssue[]): string[] {
    const recommendations: string[] = [];
    const issueTypes = new Set(issues.map(issue => issue.rule));

    if (issueTypes.has('color-contrast')) {
      recommendations.push('Improve color contrast to meet WCAG AA standards (4.5:1 ratio)');
    }

    if (issueTypes.has('focus-indicator')) {
      recommendations.push('Add visible focus indicators to all interactive elements');
    }

    if (issueTypes.has('heading-hierarchy')) {
      recommendations.push('Fix heading hierarchy to improve screen reader navigation');
    }

    if (issueTypes.has('basic-validation')) {
      recommendations.push('Add missing alt text and form labels');
    }

    if (issueTypes.has('landmarks')) {
      recommendations.push('Add landmark elements (main, nav, aside) for better page structure');
    }

    if (recommendations.length === 0) {
      recommendations.push('Great job! No major accessibility issues found.');
    }

    return recommendations;
  }
}

// React hook for accessibility testing
export const useAccessibilityTesting = () => {
  const tester = AccessibilityTester.getInstance();

  const testElement = React.useCallback(async (element: HTMLElement) => {
    return await tester.testElement(element);
  }, [tester]);

  const testPage = React.useCallback(async () => {
    return await tester.testElement(document.body);
  }, [tester]);

  return {
    testElement,
    testPage
  };
};

// Import React for hooks
import React from 'react';