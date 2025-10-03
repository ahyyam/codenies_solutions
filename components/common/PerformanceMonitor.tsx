'use client';

import React, { useEffect } from 'react';
import { reportWebVitals, performanceMonitor } from '@/lib/utils/performance';
import { getAllWebVitals } from '@/lib/utils/web-vitals';
import { initializeDesignSystemPerformanceMonitoring } from '@/lib/utils/design-system-performance';

interface PerformanceMonitorProps {
  enableWebVitals?: boolean;
  enableCustomMetrics?: boolean;
  enableDesignSystemMonitoring?: boolean;
  logToConsole?: boolean;
}

export function PerformanceMonitor({
  enableWebVitals = true,
  enableCustomMetrics = true,
  enableDesignSystemMonitoring = true,
  logToConsole = process.env.NODE_ENV === 'development'
}: PerformanceMonitorProps) {
  useEffect(() => {
    // Only run in browser environment
    if (typeof window === 'undefined') return;
    
    if (!enableWebVitals && !enableCustomMetrics && !enableDesignSystemMonitoring) return;

    // Initialize design system performance monitoring
    let designSystemMonitor: any = null;
    if (enableDesignSystemMonitoring) {
      try {
        designSystemMonitor = initializeDesignSystemPerformanceMonitoring();
        if (logToConsole) {
          console.log('Design system performance monitoring initialized');
        }
      } catch (error) {
        console.warn('Design system performance monitoring error:', error);
      }
    }

    // Enhanced performance monitoring with design system metrics
    if (enableCustomMetrics) {
      try {
        // Track critical CSS loading
        performance.mark('critical-css-loaded');
        
        const startTime = performance.now();
        
        const handleLoad = () => {
          const loadTime = performance.now() - startTime;
          performance.mark('all-css-loaded');
          
          if (logToConsole) {
            console.log(`Page load time: ${loadTime.toFixed(2)}ms`);
          }

          // Track font loading
          if ('fonts' in document) {
            document.fonts.ready.then(() => {
              performance.mark('fonts-loaded');
              if (logToConsole) {
                console.log('All fonts loaded');
              }
            });
          }
        };

        if (document.readyState === 'complete') {
          handleLoad();
        } else {
          window.addEventListener('load', handleLoad, { once: true });
        }
      } catch (error) {
        console.warn('Performance monitoring error:', error);
      }
    }

    // Enhanced Web Vitals monitoring
    if (enableWebVitals) {
      try {
        if ('PerformanceObserver' in window) {
          // LCP Observer
          const lcpObserver = new PerformanceObserver((list) => {
            for (const entry of list.getEntries()) {
              if (logToConsole) {
                console.log(`LCP: ${entry.startTime.toFixed(2)}ms`);
              }
            }
          });
          lcpObserver.observe({ type: 'largest-contentful-paint', buffered: true });

          // FID Observer
          const fidObserver = new PerformanceObserver((list) => {
            for (const entry of list.getEntries()) {
              const fid = (entry as any).processingStart - entry.startTime;
              if (logToConsole) {
                console.log(`FID: ${fid.toFixed(2)}ms`);
              }
            }
          });
          fidObserver.observe({ type: 'first-input', buffered: true });

          // CLS Observer
          let clsValue = 0;
          const clsObserver = new PerformanceObserver((list) => {
            for (const entry of list.getEntries()) {
              if (!(entry as any).hadRecentInput) {
                clsValue += (entry as any).value;
              }
            }
            if (logToConsole) {
              console.log(`CLS: ${clsValue.toFixed(4)}`);
            }
          });
          clsObserver.observe({ type: 'layout-shift', buffered: true });
          
          return () => {
            lcpObserver.disconnect();
            fidObserver.disconnect();
            clsObserver.disconnect();
            if (designSystemMonitor) {
              designSystemMonitor.cleanup();
            }
          };
        }
      } catch (error) {
        console.warn('Web Vitals monitoring error:', error);
      }
    }

    return () => {
      if (designSystemMonitor) {
        designSystemMonitor.cleanup();
      }
    };
  }, [enableWebVitals, enableCustomMetrics, enableDesignSystemMonitoring, logToConsole]);

  // This component doesn't render anything
  return null;
}

// Hook for measuring component performance
export function usePerformanceMeasure(name: string, dependencies: any[] = []) {
  useEffect(() => {
    performanceMonitor.startMeasure(name);
    
    return () => {
      const duration = performanceMonitor.endMeasure(name);
      if (process.env.NODE_ENV === 'development' && duration) {
        console.log(`${name} render time: ${duration.toFixed(2)}ms`);
      }
    };
  }, dependencies);
}

// Component wrapper for performance measurement
export function withPerformanceMonitoring<P extends object>(
  Component: React.ComponentType<P>,
  name?: string
) {
  const WrappedComponent = (props: P) => {
    const componentName = name || Component.displayName || Component.name || 'Component';
    usePerformanceMeasure(componentName);
    
    return <Component {...props} />;
  };

  WrappedComponent.displayName = `withPerformanceMonitoring(${Component.displayName || Component.name})`;
  
  return WrappedComponent;
}

export default PerformanceMonitor;