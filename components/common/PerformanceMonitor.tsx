'use client';

import React, { useEffect } from 'react';
import { reportWebVitals, performanceMonitor } from '@/lib/utils/performance';
import { getAllWebVitals } from '@/lib/utils/web-vitals';

interface PerformanceMonitorProps {
  enableWebVitals?: boolean;
  enableCustomMetrics?: boolean;
  logToConsole?: boolean;
}

export function PerformanceMonitor({
  enableWebVitals = true,
  enableCustomMetrics = true,
  logToConsole = process.env.NODE_ENV === 'development'
}: PerformanceMonitorProps) {
  useEffect(() => {
    // Only run in browser environment
    if (typeof window === 'undefined') return;
    
    if (!enableWebVitals && !enableCustomMetrics) return;

    // Simple performance monitoring without complex dependencies
    if (enableCustomMetrics) {
      try {
        // Basic performance monitoring
        const startTime = performance.now();
        
        const handleLoad = () => {
          const loadTime = performance.now() - startTime;
          if (logToConsole) {
            console.log(`Page load time: ${loadTime.toFixed(2)}ms`);
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

    // Basic Web Vitals monitoring
    if (enableWebVitals) {
      try {
        // Simple LCP monitoring
        if ('PerformanceObserver' in window) {
          const observer = new PerformanceObserver((list) => {
            for (const entry of list.getEntries()) {
              if (logToConsole) {
                console.log(`Performance metric: ${entry.name}`, entry.startTime);
              }
            }
          });
          
          observer.observe({ type: 'largest-contentful-paint', buffered: true });
          
          return () => {
            observer.disconnect();
          };
        }
      } catch (error) {
        console.warn('Web Vitals monitoring error:', error);
      }
    }
  }, [enableWebVitals, enableCustomMetrics, logToConsole]);

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