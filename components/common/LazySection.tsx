'use client';

import React, { ReactNode, useState } from 'react';
import { useIntersectionObserver } from '@/lib/utils/performance';

interface LazySectionProps {
  children: ReactNode;
  fallback?: ReactNode;
  threshold?: number;
  rootMargin?: string;
  triggerOnce?: boolean;
  className?: string;
  style?: React.CSSProperties;
  delay?: number;
}

export function LazySection({
  children,
  fallback,
  threshold = 0.1,
  rootMargin = '50px',
  triggerOnce = true,
  className = '',
  style,
  delay = 0
}: LazySectionProps) {
  const [hasTriggered, setHasTriggered] = useState(false);
  const [ref, isIntersecting] = useIntersectionObserver({
    threshold,
    rootMargin
  });

  // Handle intersection with optional delay
  const shouldRender = isIntersecting || (triggerOnce && hasTriggered);
  
  if (isIntersecting && !hasTriggered && triggerOnce) {
    if (delay > 0) {
      setTimeout(() => setHasTriggered(true), delay);
    } else {
      setHasTriggered(true);
    }
  }

  return (
    <div 
      ref={ref as React.RefObject<HTMLDivElement>}
      className={className}
      style={style}
    >
      {shouldRender ? children : (fallback || <div className="h-32 bg-gray-100 animate-pulse" />)}
    </div>
  );
}

// Specialized lazy components for different content types
export function LazyBlogSection({ children, ...props }: Omit<LazySectionProps, 'fallback'>) {
  return (
    <LazySection
      {...props}
      fallback={
        <div className="space-y-4">
          <div className="h-6 bg-gray-200 rounded animate-pulse" />
          <div className="h-4 bg-gray-200 rounded animate-pulse w-3/4" />
          <div className="h-4 bg-gray-200 rounded animate-pulse w-1/2" />
        </div>
      }
    >
      {children}
    </LazySection>
  );
}

export function LazyProjectSection({ children, ...props }: Omit<LazySectionProps, 'fallback'>) {
  return (
    <LazySection
      {...props}
      fallback={
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="bg-gray-200 rounded-lg h-64 animate-pulse" />
          ))}
        </div>
      }
    >
      {children}
    </LazySection>
  );
}

export function LazyImageGallery({ children, ...props }: Omit<LazySectionProps, 'fallback'>) {
  return (
    <LazySection
      {...props}
      fallback={
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className="bg-gray-200 rounded aspect-square animate-pulse" />
          ))}
        </div>
      }
    >
      {children}
    </LazySection>
  );
}

export default LazySection;