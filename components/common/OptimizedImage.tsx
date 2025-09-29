'use client';

import Image from 'next/image';
import React, { useState, useRef } from 'react';
import { useIntersectionObserver } from '@/lib/utils/performance';

interface OptimizedImageProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  quality?: number;
  priority?: boolean;
  placeholder?: 'blur' | 'empty';
  blurDataURL?: string;
  sizes?: string;
  className?: string;
  fill?: boolean;
  style?: React.CSSProperties;
  onLoad?: () => void;
  onError?: () => void;
  lazy?: boolean;
  aspectRatio?: string;
}

export function OptimizedImage({
  src,
  alt,
  width,
  height,
  quality = 85,
  priority = false,
  placeholder = 'blur',
  blurDataURL,
  sizes,
  className = '',
  fill = false,
  style,
  onLoad,
  onError,
  lazy = true,
  aspectRatio,
  ...props
}: OptimizedImageProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [ref, isIntersecting] = useIntersectionObserver({
    threshold: 0.1,
    rootMargin: '50px'
  });

  // Generate default blur data URL if not provided
  const defaultBlurDataURL = blurDataURL || generateBlurDataURL(width || 400, height || 300);

  // Determine if image should load
  const shouldLoad = priority || !lazy || isIntersecting;

  // Handle image load
  const handleLoad = () => {
    setIsLoaded(true);
    onLoad?.();
  };

  // Handle image error
  const handleError = () => {
    setHasError(true);
    onError?.();
  };

  // Generate responsive sizes if not provided
  const responsiveSizes = sizes || generateDefaultSizes(width);

  // Container styles for aspect ratio
  const containerStyle: React.CSSProperties = {
    ...style,
    ...(aspectRatio && {
      aspectRatio,
      position: 'relative'
    })
  };

  return (
    <div 
      ref={ref as React.RefObject<HTMLDivElement>}
      className={`relative overflow-hidden ${className}`}
      style={containerStyle}
    >
      {shouldLoad && !hasError ? (
        <Image
          src={src}
          alt={alt}
          width={fill ? undefined : width}
          height={fill ? undefined : height}
          fill={fill}
          quality={quality}
          priority={priority}
          placeholder={placeholder}
          blurDataURL={placeholder === 'blur' ? defaultBlurDataURL : undefined}
          sizes={responsiveSizes}
          onLoad={handleLoad}
          onError={handleError}
          className={`transition-opacity duration-300 ${
            isLoaded ? 'opacity-100' : 'opacity-0'
          }`}
          {...props}
        />
      ) : hasError ? (
        <div className="flex items-center justify-center bg-gray-200 text-gray-500 w-full h-full">
          <span>Failed to load image</span>
        </div>
      ) : (
        <div 
          className="bg-gray-200 animate-pulse w-full h-full"
          style={{ aspectRatio: aspectRatio || (width && height ? `${width}/${height}` : undefined) }}
        />
      )}
    </div>
  );
}

// Utility functions
function generateBlurDataURL(width: number, height: number): string {
  // Create a simple SVG blur placeholder
  const svg = `
    <svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style="stop-color:#f3f4f6;stop-opacity:1" />
          <stop offset="100%" style="stop-color:#e5e7eb;stop-opacity:1" />
        </linearGradient>
      </defs>
      <rect width="100%" height="100%" fill="url(#grad)" />
    </svg>
  `;
  
  // Use btoa for base64 encoding in browser environment
  if (typeof window !== 'undefined') {
    return `data:image/svg+xml;base64,${btoa(svg)}`;
  }
  
  // Fallback for server-side rendering
  return `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`;
}

function generateDefaultSizes(width?: number): string {
  if (!width) {
    return '(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw';
  }
  
  return `(max-width: 640px) 100vw, (max-width: 1024px) ${Math.min(width, 640)}px, ${width}px`;
}

// Specialized image components for common use cases
export function HeroImage(props: Omit<OptimizedImageProps, 'priority' | 'sizes'>) {
  return (
    <OptimizedImage
      {...props}
      priority={true}
      sizes="100vw"
      quality={90}
    />
  );
}

export function ThumbnailImage(props: Omit<OptimizedImageProps, 'sizes' | 'quality'>) {
  return (
    <OptimizedImage
      {...props}
      sizes="(max-width: 640px) 50vw, (max-width: 1024px) 25vw, 200px"
      quality={75}
    />
  );
}

export function BlogImage(props: Omit<OptimizedImageProps, 'sizes'>) {
  return (
    <OptimizedImage
      {...props}
      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 80vw, 800px"
    />
  );
}

export function ProjectImage(props: Omit<OptimizedImageProps, 'sizes'>) {
  return (
    <OptimizedImage
      {...props}
      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 600px"
    />
  );
}

export default OptimizedImage;