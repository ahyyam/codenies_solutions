'use client';

import { useEffect } from 'react';

interface WebVitalsData {
  lcp?: number;
  fid?: number;
  cls?: number;
  fcp?: number;
  ttfb?: number;
}

export default function PerformanceMonitor() {
  useEffect(() => {
    // Skip performance monitoring in development
    if (process.env.NODE_ENV !== 'production') return;

    // Core Web Vitals measurement
    function measureWebVitals() {
      const vitals: WebVitalsData = {};

      // Largest Contentful Paint (LCP)
      try {
        new PerformanceObserver((list) => {
          const entries = list.getEntries();
          const lastEntry = entries[entries.length - 1];
          if (lastEntry) {
            vitals.lcp = lastEntry.startTime;
            performance.mark('lcp', { startTime: lastEntry.startTime });
            
            // Log for debugging
            if (vitals.lcp > 2500) {
              console.warn(`LCP is ${vitals.lcp}ms - consider optimization`);
            }
          }
        }).observe({ entryTypes: ['largest-contentful-paint'] });
      } catch (e) {
        console.debug('LCP measurement not supported');
      }

      // First Input Delay (FID)
      try {
        new PerformanceObserver((list) => {
          const firstInput = list.getEntries()[0];
          if (firstInput) {
            const fid = (firstInput as any).processingStart - firstInput.startTime;
            vitals.fid = fid;
            performance.mark('fid', { startTime: fid });
            
            if (fid > 100) {
              console.warn(`FID is ${fid}ms - consider optimization`);
            }
          }
        }).observe({ entryTypes: ['first-input'] });
      } catch (e) {
        console.debug('FID measurement not supported');
      }

      // Cumulative Layout Shift (CLS)
      try {
        let clsValue = 0;
        new PerformanceObserver((list) => {
          for (const entry of list.getEntries()) {
            if (!(entry as any).hadRecentInput && (entry as any).value) {
              clsValue += (entry as any).value;
            }
          }
          vitals.cls = clsValue;
          performance.mark('cls', { startTime: clsValue });
          
          if (clsValue > 0.1) {
            console.warn(`CLS is ${clsValue} - consider reducing layout shifts`);
          }
        }).observe({ entryTypes: ['layout-shift'] });
      } catch (e) {
        console.debug('CLS measurement not supported');
      }

      // First Contentful Paint (FCP)
      try {
        new PerformanceObserver((list) => {
          const entries = list.getEntries();
          const firstEntry = entries[0];
          if (firstEntry) {
            vitals.fcp = firstEntry.startTime;
            performance.mark('fcp', { startTime: firstEntry.startTime });
            
            if (vitals.fcp > 1800) {
              console.warn(`FCP is ${vitals.fcp}ms - consider optimization`);
            }
          }
        }).observe({ entryTypes: ['paint'] });
      } catch (e) {
        console.debug('FCP measurement not supported');
      }

      // Time to First Byte (TTFB)
      try {
        const navigationEntry = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
        if (navigationEntry) {
          vitals.ttfb = navigationEntry.responseStart - navigationEntry.requestStart;
          performance.mark('ttfb', { startTime: vitals.ttfb });
          
          if (vitals.ttfb > 600) {
            console.warn(`TTFB is ${vitals.ttfb}ms - consider server optimization`);
          }
        }
      } catch (e) {
        console.debug('TTFB measurement error');
      }

      // Send metrics after a delay to ensure all measurements are collected
      setTimeout(() => {
        console.log('Core Web Vitals:', vitals);
        
        // Send to analytics if configured
        if (typeof window !== 'undefined' && window.gtag) {
          Object.entries(vitals).forEach(([metric, value]) => {
            if (value !== undefined) {
              window.gtag('event', metric, {
                value: Math.round(value),
                custom_map: { metric_name: metric },
              });
            }
          });
        }
      }, 3000);
    }

    // Font loading optimization monitoring
    let fontLoadStartTime: number;
    
    function monitorFontLoading() {
      if ('fonts' in document) {
        fontLoadStartTime = performance.now();
        
        document.fonts.ready.then(() => {
          const fontLoadTime = performance.now() - fontLoadStartTime;
          performance.mark('fonts-loaded', { startTime: fontLoadTime });
          
          // Remove loading class
          document.body.classList.remove('font-loading');
          
          if (fontLoadTime > 500) {
            console.warn(`Font loading took ${fontLoadTime}ms - consider optimization`);
          }
        });
      } else {
        // Fallback for browsers that don't support font loading API
        setTimeout(() => {
          document.body.classList.remove('font-loading');
        }, 3000);
      }
    }

    // Resource loading monitor
    function monitorResourceLoading() {
      const observer = new PerformanceObserver((list) => {
        list.getEntries().forEach((entry) => {
          if (entry.duration > 1000) {
            console.warn(`Slow resource: ${entry.name} took ${entry.duration}ms`);
          }
        });
      });
      
      observer.observe({ entryTypes: ['resource'] });
      
      return () => observer.disconnect();
    }

    // Start monitoring
    measureWebVitals();
    monitorFontLoading();
    const cleanup = monitorResourceLoading();

    // Cleanup on unmount
    return () => {
      cleanup();
    };
  }, []);

  return null; // This component doesn't render anything
}

// Type declarations for gtag
declare global {
  interface Window {
    gtag?: (...args: any[]) => void;
  }
}